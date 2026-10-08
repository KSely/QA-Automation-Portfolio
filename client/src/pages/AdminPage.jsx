import { useEffect, useState } from "react";

import { getAdminAccess } from "../services/authApi.js";

export default function AdminPage() {
    const [message, setMessage] = useState("Verifying admin access...");
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        getAdminAccess()
            .then((data) => {
                if (active) setMessage(data.message);
            })
            .catch((requestError) => {
                if (active) setError(requestError.message);
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <section className="auth-card" aria-labelledby="admin-title">
            <p className="auth-eyebrow">Role authorization</p>
            <h1 id="admin-title" className="h2 mb-3">Admin</h1>
            {error ? (
                <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {error}
                </div>
            ) : (
                <p role="status" aria-live="polite">{message}</p>
            )}
        </section>
    );
}
