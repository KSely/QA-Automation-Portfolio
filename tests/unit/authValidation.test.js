import {
    normalizeEmail,
    validateLoginInput,
    validatePassword,
    validateRegistrationInput,
} from "../../utils/authValidation.js";

describe("authentication validation", () => {
    describe("validatePassword", () => {
        test("rejects a seven-character password", () => {
            expect(validatePassword("Aa1!abc")).toBe(
                "Password must be between 8 and 64 characters."
            );
        });

        test("accepts a valid eight-character password", () => {
            expect(validatePassword("Aa1!abcd")).toBeNull();
        });

        test("accepts a valid 64-character password", () => {
            expect(validatePassword(`Aa1!${"x".repeat(60)}`)).toBeNull();
        });

        test("rejects a 65-character password", () => {
            expect(validatePassword(`Aa1!${"x".repeat(61)}`)).toBe(
                "Password must be between 8 and 64 characters."
            );
        });

        test("rejects a password without an uppercase letter", () => {
            expect(validatePassword("lower1!a")).toBe(
                "Password must include an uppercase letter."
            );
        });

        test("rejects a password without a lowercase letter", () => {
            expect(validatePassword("UPPER1!A")).toBe(
                "Password must include a lowercase letter."
            );
        });

        test("rejects a password without a number", () => {
            expect(validatePassword("NoNumber!")).toBe(
                "Password must include a number."
            );
        });

        test("rejects a password without a special character", () => {
            expect(validatePassword("NoSpecial1")).toBe(
                "Password must include a special character."
            );
        });
    });

    test("normalizes an email before registration", () => {
        expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
    });

    test("accepts valid normalized registration input", () => {
        expect(
            validateRegistrationInput({
                email: "  User@Example.COM ",
                password: "Password1!",
                confirmPassword: "Password1!",
            })
        ).toEqual({ email: "user@example.com", password: "Password1!" });
    });

    test("rejects an invalid registration email", () => {
        expect(
            validateRegistrationInput({
                email: "invalid-email",
                password: "Password1!",
                confirmPassword: "Password1!",
            })
        ).toEqual({ error: "A valid email address is required." });
    });

    test("rejects a mismatched password confirmation", () => {
        expect(
            validateRegistrationInput({
                email: "user@example.com",
                password: "Password1!",
                confirmPassword: "Different1!",
            })
        ).toEqual({ error: "Password confirmation does not match." });
    });

    test("normalizes valid login input", () => {
        expect(
            validateLoginInput({
                email: " USER@example.com ",
                password: "Password1!",
            })
        ).toEqual({ email: "user@example.com", password: "Password1!" });
    });
});
