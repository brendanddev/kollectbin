import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { DATABASE_NAME } from "../config/config.js";
import { createComicsTable, seedComicsTable } from "./comics.js";
import { createBooksTable } from "./books.js";
import { createUsersTable } from "./users.js";

// Opens a new database connection using sqlite3 as the driver, creating the file 
// if it dosent exist.
export async function initDatabase(): Promise<Database> {
    const db = await open({
        filename: DATABASE_NAME,
        driver: sqlite3.Database
    });
    await createComicsTable(db);
    await createBooksTable(db);
    await createUsersTable(db);
    await seedComicsTable(db);
    return db;
}
