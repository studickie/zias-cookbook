import { Db } from 'mongodb';
import User, { createUser } from '../models/User';
import MongoAccess from './MongoAccess';

export default class Users extends MongoAccess<User> {

    constructor(context: Db) {
        super(context, 'users');
    }

    async insertOne (insertDoc: Pick<User, 'email' | 'pass'>): Promise<User | null> {
        const createdUser = await createUser({ email: insertDoc.email, pass: insertDoc.pass });
        console.log('createdUser', createdUser)
        if (createdUser === null) return null;

        return await super.insertOne(createdUser);
    }
}