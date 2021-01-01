export interface User {
    firstname?: string;
    lastname?: string;
    username: string;
    email: string;
    hash: string;
    dateCreated: Date;
    lastUpdated: Date;
}

export interface UserRequest {
    firstname?: string;
    lastname?: string;
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    firstname: string | null;
    lastname: string | null;
    username: string;
    email: string;
}