import { pool } from "../database/pool.js";
import { normalizeEmail } from "../utils/authValidation.js";

const [, , emailArgument, roleArgument] = process.argv;

const allowedRoles = new Set(["user", "admin"]);

async function main() {
    const email = normalizeEmail(emailArgument);
    const role =
        typeof roleArgument === "string"
            ? roleArgument.trim().toLowerCase()
            : "";

    if (!email || !allowedRoles.has(role)) {
        console.error(
            "Usage: node scripts/setUserRole.js <email> <user|admin>"
        );
        process.exitCode = 1;
        return;
    }

    const result = await pool.query(
        `UPDATE users
         SET role = $1
         WHERE email = $2
         RETURNING id, email, role`,
        [role, email]
    );

    if (result.rowCount === 0) {
        console.error(`User not found: ${email}`);
        process.exitCode = 1;
        return;
    }

    const user = result.rows[0];

    console.log(`Updated role: ${user.email} -> ${user.role}`);
}

try {
    await main();
} catch (error) {
    console.error("Failed to update user role:", error.message);
    process.exitCode = 1;
} finally {
    await pool.end();
}