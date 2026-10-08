const AUTH_API_BASE = "/api/auth";

async function request(path, options = {}) {
    const response = await fetch(`${AUTH_API_BASE}${path}`, {
        credentials: "include",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await response.json().catch(() => ({
        success: false,
        message: "The server returned an unreadable response.",
    }));

    if (!response.ok) {
        const error = new Error(data.message || "The request failed.");
        error.status = response.status;
        throw error;
    }

    return data;
}

export async function getCurrentUser() {
    try {
        const data = await request("/me");
        return data.user;
    } catch (error) {
        if (error.status === 401) return null;
        throw error;
    }
}

export async function login(credentials) {
    return request("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export async function register(registration) {
    return request("/register", {
        method: "POST",
        body: JSON.stringify(registration),
    });
}

export async function logout() {
    return request("/logout", { method: "POST" });
}

export async function getAdminAccess() {
    return request("/admin");
}
