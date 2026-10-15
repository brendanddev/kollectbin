// Describes the shape of the User types.

export interface User { 
    id: number;
    email: string;
    username: string;
    password: string;
}

export type UserInput = Omit<User, 'id'>;
