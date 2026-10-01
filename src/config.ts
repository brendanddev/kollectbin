import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.CONFIG || 3000;
export const DATABASE_NAME = process.env.DATABASE_NAME || "database.db";
