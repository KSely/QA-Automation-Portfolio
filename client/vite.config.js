import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/auth/",
    plugins: [react()],
    build: {
        outDir: "../public/auth",
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
});
