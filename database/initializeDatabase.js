import { readFile } from "node:fs/promises";

import { pool } from "./pool.js";

const schemaUrl = new URL("./schema.sql", import.meta.url);

export async function initializeDatabase() {
    const schema = await readFile(schemaUrl, "utf8");
    await pool.query(schema);
}
