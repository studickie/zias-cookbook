import bcrypt from 'bcrypt';
import * as DbContext from '../database/connection';
import User from '../models/User';
import UserRequest from '../models/UserRequest';
import UserResponse from '../models/UserResponse';

export async function findUsers(): Promise<UserResponse[]> {
    const response = await DbContext.findCollection<User>('users');

    return response.map(usr => (
        {
            _id: usr._id,
            email: usr.email
        }
    ));
}

export async function findUser(fieldName: string, fieldValue: string): Promise<User | null> {
    const response = await DbContext.findInCollection<User>('users', fieldName, fieldValue);

    if (!response) return null;

    return response;
}

export async function insertUser(args: UserRequest): Promise<UserResponse | null> {
    const dateNow = new Date().toISOString();
    const newUser = ({
        email: args.email,
        hash: await bcrypt.hash(args.password, 10),
        dateCreated: dateNow,
        lastUpdated: dateNow
    } as User);

    const response = await DbContext.insertIntoCollection<User>('users', newUser);

    if (!response) return null;

    return {
        _id: response._id,
        email: response.email
    };
}