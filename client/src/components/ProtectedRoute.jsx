import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p role="status">Loading account...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return (
            <section className="auth-card text-center" aria-labelledby="denied-title">
                <p className="auth-eyebrow">Authorization</p>
                <h1 id="denied-title" className="h2">Access denied</h1>
                <p className="mb-0">Your account does not have permission to view this page.</p>
            </section>
        );
    }

    return children;
}
