import type { Database } from "sqlite";
import type { User, UserInput } from "../types/user.js";

// Data access layer for the `users` table. Each function runs one SQL
// query and returns the result, there is no HTTP or validation here.

export async function getUser(db: Database, id: number): Promise<User | undefined> {
    return await db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
}

export async function insertUser(db: Database, user: UserInput): Promise<User | undefined> {
    return await db.get<User>(`
        INSERT INTO users(email, username, password)
        VALUES (?, ?, ?)
        RETURNING *`,
        user.email, user.username, user.password
    );
}

export async function updateUser(db: Database, id: number, user: UserInput): Promise<User | undefined> {
    return await db.get<User>(`
        UPDATE users 
        SET email = ?, username = ?, password = ?
        WHERE id = ?
        RETURNING *`,
        user.email, user.username, user.password
    );
}

export async function deleteUser(db: Database, id: number): Promise<User | undefined> {
    return await db.get<User>(`
        DELETE FROM users
        WHERE id = ?
        RETURNING *`,
        id
    );
}
