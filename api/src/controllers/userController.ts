import bcrypt from 'bcrypt';
import * as DbContext from '../database/connection';
import User from '../models/User';
import UserRequest from '../models/UserRequest';
import UserResponse from '../models/UserResponse';

export async function findUsers (): Promise<UserResponse[] | null> {
    const response = await DbContext.findCollection<User>('users');

    return response
        ? response.map(usr => ({ _id: usr._id, email: usr.email }))
        : null;
}

export async function findUser (fieldName: string, fieldValue: string): Promise<UserResponse | null> {
    const response = await DbContext.findInCollection<User>('users', fieldName, fieldValue);

    return response
    ? { 
        _id: response._id, 
        email : response.email
    }
    : null;
}

export async function createUser ({ email, password }: UserRequest): Promise<UserResponse | null>  {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const dateNow = new Date().toISOString();

    const newUser = {
        email: email,
        hash: hash,
        dateCreated: dateNow,
        lastUpdated: dateNow
    };

    const response = await DbContext.insertIntoCollection<User>('users', newUser);
    
    return response 
    ? { 
        _id: response._id, 
        email : response.email
    }
    : null;
}