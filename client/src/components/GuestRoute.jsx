import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function GuestRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p role="status">Loading account...</p>;
    }

    return user ? <Navigate to="/account" replace /> : children;
}
