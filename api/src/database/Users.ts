import { Db } from 'mongodb';
import User, { UserActiveStatus, createUser, validatePassword } from '../models/User';
import MongoAccess from './MongoAccess';

export default class Users extends MongoAccess<User> {

    constructor(context: Db) {
        super(context, 'users');
    }

    async create (insertDoc: Pick<User, 'email' | 'pass'>): Promise<User | null> {
        const createdUser = await createUser({ email: insertDoc.email, pass: insertDoc.pass });
        
        if (createdUser === null) return null;

        return await super.insertOne(createdUser);
    }

    async verifyPassword (user: Pick<User, 'email' | 'pass'>): Promise<User | null> {
        const matchedUser = await super.findOne({ email: user.email });

        if (matchedUser === null || !await validatePassword(matchedUser.pass, user.pass)) {
            return null;
        }

        return matchedUser;
    }

    async verifyEmail (token: string): Promise<boolean> {
        const filters = {
            verifyEmail: token,
            verifyEmailCreatedOn: {
                $lt: new Date(Date.now() + 5 * (60 * 1000))
            }
        };

        const updateDoc = {
            $set: {
                active: UserActiveStatus.active,
                verifyEmail: null,
                verifyEmailCreatedOn: null,
                updatedOn: new Date()
            }
        };

        return await super.updateOne(filters, updateDoc);
    }
}