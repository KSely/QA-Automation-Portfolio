import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function AuthLayout() {
    const { user, initializationError } = useAuth();
    const portfolioUrl = import.meta.env.DEV ? "http://localhost:3000/" : "/";

    return (
        <div className="auth-shell">
            <header className="auth-header">
                <nav className="container d-flex flex-wrap align-items-center justify-content-between gap-3" aria-label="Account navigation">
                    <a className="auth-brand" href={portfolioUrl}>
                        Kate | QA Automation Portfolio
                    </a>
                    <div className="d-flex flex-wrap gap-3 align-items-center">
                        <a className="auth-nav-link" href={portfolioUrl}>Portfolio</a>
                        {user ? (
                            <>
                                <NavLink className="auth-nav-link" to="/account">Account</NavLink>
                                <NavLink className="auth-nav-link" to="/admin">Admin</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="auth-nav-link" to="/login">Login</NavLink>
                                <NavLink className="auth-nav-link" to="/register">Register</NavLink>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="container auth-main">
                {initializationError && (
                    <div className="alert alert-warning" role="alert">
                        {initializationError}
                    </div>
                )}
                <Outlet />
            </main>
        </div>
    );
}
