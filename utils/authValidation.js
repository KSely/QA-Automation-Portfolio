import { isValidEmail } from "./contactValidation.js";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;

export function normalizeEmail(email) {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function validatePassword(password) {
    if (typeof password !== "string") {
        return "Password is required.";
    }

    if (
        password.length < MIN_PASSWORD_LENGTH ||
        password.length > MAX_PASSWORD_LENGTH
    ) {
        return "Password must be between 8 and 64 characters.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must include an uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
        return "Password must include a lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
        return "Password must include a number.";
    }

    if (!/[^A-Za-z0-9\s]/.test(password)) {
        return "Password must include a special character.";
    }

    return null;
}

export function validateRegistrationInput(input = {}) {
    const { email, password, confirmPassword } =
        input && typeof input === "object" ? input : {};
    const normalizedEmail = normalizeEmail(email);

    if (normalizedEmail.length > 320 || !isValidEmail(normalizedEmail)) {
        return { error: "A valid email address is required." };
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        return { error: passwordError };
    }

    if (password !== confirmPassword) {
        return { error: "Password confirmation does not match." };
    }

    return { email: normalizedEmail, password };
}

export function validateLoginInput(input = {}) {
    const { email, password } =
        input && typeof input === "object" ? input : {};
    const normalizedEmail = normalizeEmail(email);

    if (
        normalizedEmail.length > 320 ||
        !isValidEmail(normalizedEmail) ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        return { error: "Email and password are required." };
    }

    return { email: normalizedEmail, password };
}
