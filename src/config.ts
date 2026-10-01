import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.CONFIG || 3000;
