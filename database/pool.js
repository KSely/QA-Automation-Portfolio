import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const connectionConfig = process.env.DATABASE_URL
    ? {
          connectionString: process.env.DATABASE_URL,
      }
    : {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          password: process.env.DB_PASSWORD,
          port: Number(process.env.DB_PORT) || 5432,
      };

export const pool = new Pool(connectionConfig);

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error.message);
});
