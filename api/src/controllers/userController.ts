import bcrypt from 'bcrypt';
import emailEvent from '../helpers/email';
import * as DbContext from '../database/connection';
import User, { UserActiveStatus } from '../models/User';
import UserRequest from '../models/UserRequest';
import UserResponse from '../models/UserResponse';

export async function findUsers(): Promise<User[]> {
    const response = await DbContext.findCollection<User>('users');

    return response;
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
        lastUpdated: dateNow,
        active: UserActiveStatus.unverified
    } as User);

    const response = await DbContext.insertIntoCollection<User>('users', newUser);

    if (!response) return null;

    emailEvent.emit('newUser', {
        userId: newUser._id,
        userEmail: newUser.email
    });

    return {
        _id: response._id,
        email: response.email
    };
}

export async function verifyNewUser(userId: string): Promise<boolean> {
    
    const updateDoc = {
        $set: {
            active: UserActiveStatus.active
        }
    };

    const response = await DbContext.updateOneInCollection('users', '_id', userId, updateDoc);
    
    return response ? true : false;
}