import bcrypt from "bcrypt";
import express from "express";

import {
    requireAuthentication,
    requireRole,
} from "../middleware/authMiddleware.js";
import {
    createUser,
    findUserByEmail,
} from "../services/userService.js";
import {
    validateLoginInput,
    validateRegistrationInput,
} from "../utils/authValidation.js";

const PASSWORD_HASH_ROUNDS = 12;
const INVALID_LOGIN_MESSAGE = "Invalid email or password.";

export const authRouter = express.Router();

function regenerateSession(req) {
    return new Promise((resolve, reject) => {
        req.session.regenerate((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}

function saveSession(req) {
    return new Promise((resolve, reject) => {
        req.session.save((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}

authRouter.post("/register", async (req, res, next) => {
    const validation = validateRegistrationInput(req.body);
    if (validation.error) {
        return res.status(400).json({
            success: false,
            message: validation.error,
        });
    }

    try {
        const existingUser = await findUserByEmail(validation.email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const passwordHash = await bcrypt.hash(
            validation.password,
            PASSWORD_HASH_ROUNDS
        );
        const user = await createUser(validation.email, passwordHash);

        await regenerateSession(req);
        req.session.userId = user.id;
        await saveSession(req);

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            user,
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        return next(error);
    }
});

authRouter.post("/login", async (req, res, next) => {
    const validation = validateLoginInput(req.body);
    if (validation.error) {
        return res.status(400).json({
            success: false,
            message: validation.error,
        });
    }

    try {
        const user = await findUserByEmail(validation.email);
        const passwordMatches = user
            ? await bcrypt.compare(validation.password, user.password_hash)
            : false;

        if (!user || !passwordMatches) {
            return res.status(401).json({
                success: false,
                message: INVALID_LOGIN_MESSAGE,
            });
        }

        await regenerateSession(req);
        req.session.userId = user.id;
        await saveSession(req);

        return res.json({
            success: true,
            message: "Login successful.",
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        return next(error);
    }
});

authRouter.post("/logout", (req, res, next) => {
    req.session.destroy((error) => {
        if (error) return next(error);

        res.clearCookie("qa_portfolio.sid", { path: "/" });
        return res.json({ success: true, message: "Logout successful." });
    });
});

authRouter.get("/me", requireAuthentication, (req, res) => {
    res.json({ success: true, user: req.user });
});

authRouter.get(
    "/admin",
    requireAuthentication,
    requireRole("admin"),
    (req, res) => {
        res.json({ success: true, message: "Admin access granted." });
    }
);
