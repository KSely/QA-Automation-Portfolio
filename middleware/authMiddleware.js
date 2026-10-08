import { findUserById } from "../services/userService.js";

export async function requireAuthentication(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    try {
        const user = await findUserById(req.session.userId);

        if (!user) {
            req.session.destroy(() => {});
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
}

export function requireRole(role) {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Forbidden.",
            });
        }

        return next();
    };
}
