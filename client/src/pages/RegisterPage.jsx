import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function updateField(event) {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await register(form);
            setForm({ email: "", password: "", confirmPassword: "" });
            navigate("/account", { replace: true });
        } catch (requestError) {
            setError(requestError.message);
            setForm((current) => ({
                ...current,
                password: "",
                confirmPassword: "",
            }));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="auth-card" aria-labelledby="register-title">
            <p className="auth-eyebrow">Create an account</p>
            <h1 id="register-title" className="h2 mb-3">Register</h1>
            <p className="text-secondary">
                Passwords must contain 8–64 characters with uppercase, lowercase,
                number, and special characters.
            </p>

            {error && (
                <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="register-email">Email</label>
                    <input
                        className="form-control"
                        id="register-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={updateField}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="register-password">Password</label>
                    <input
                        className="form-control"
                        id="register-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        minLength="8"
                        maxLength="64"
                        aria-describedby="password-requirements"
                        required
                        value={form.password}
                        onChange={updateField}
                    />
                    <div id="password-requirements" className="form-text">
                        8–64 characters, including uppercase, lowercase, number, and special character.
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                    <input
                        className="form-control"
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        minLength="8"
                        maxLength="64"
                        required
                        value={form.confirmPassword}
                        onChange={updateField}
                    />
                </div>

                <button className="btn auth-primary w-100" type="submit" disabled={submitting}>
                    {submitting ? "Creating account..." : "Register"}
                </button>
            </form>

            <p className="mt-4 mb-0 text-center">
                Already registered? <Link to="/login">Login</Link>
            </p>
        </section>
    );
}
