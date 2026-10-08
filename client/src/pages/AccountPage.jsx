import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function AccountPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleLogout() {
        setError("");
        setSubmitting(true);

        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (requestError) {
            setError(requestError.message);
            setSubmitting(false);
        }
    }

    return (
        <section className="auth-card" aria-labelledby="account-title">
            <p className="auth-eyebrow">Protected route</p>
            <h1 id="account-title" className="h2 mb-3">Account</h1>

            {error && (
                <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            <dl className="account-details">
                <div>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                </div>
                <div>
                    <dt>Role</dt>
                    <dd>{user.role}</dd>
                </div>
            </dl>

            {user.role === "admin" && (
                <p><Link to="/admin">Open the admin authorization check</Link></p>
            )}

            <button className="btn auth-primary" type="button" onClick={handleLogout} disabled={submitting}>
                {submitting ? "Logging out..." : "Logout"}
            </button>
        </section>
    );
}
