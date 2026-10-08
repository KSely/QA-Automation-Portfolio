import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await login({ email, password });
            const destination = location.state?.from || "/account";
            navigate(destination, { replace: true });
        } catch (requestError) {
            setError(requestError.message);
            setPassword("");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="auth-card" aria-labelledby="login-title">
            <p className="auth-eyebrow">Session authentication</p>
            <h1 id="login-title" className="h2 mb-3">Login</h1>
            <p className="text-secondary">Sign in to access your account.</p>

            {error && (
                <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="login-email">Email</label>
                    <input
                        className="form-control"
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="login-password">Password</label>
                    <input
                        className="form-control"
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button className="btn auth-primary w-100" type="submit" disabled={submitting}>
                    {submitting ? "Signing in..." : "Login"}
                </button>
            </form>

            <p className="mt-4 mb-0 text-center">
                Need an account? <Link to="/register">Register</Link>
            </p>
        </section>
    );
}
