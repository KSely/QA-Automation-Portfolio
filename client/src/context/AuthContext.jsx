import { createContext, useContext, useEffect, useMemo, useState } from "react";

import * as authApi from "../services/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initializationError, setInitializationError] = useState("");

    useEffect(() => {
        let active = true;

        authApi
            .getCurrentUser()
            .then((currentUser) => {
                if (active) setUser(currentUser);
            })
            .catch(() => {
                if (active) {
                    setInitializationError(
                        "Account status is temporarily unavailable."
                    );
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            initializationError,
            async login(credentials) {
                const data = await authApi.login(credentials);
                setUser(data.user);
                return data;
            },
            async register(registration) {
                const data = await authApi.register(registration);
                setUser(data.user);
                return data;
            },
            async logout() {
                const data = await authApi.logout();
                setUser(null);
                return data;
            },
        }),
        [user, loading, initializationError]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider.");
    }

    return context;
}
