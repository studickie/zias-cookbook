import { Db } from 'mongodb';
import UserToken, { createUserToken } from '../models/UserToken';
import MongoAccess from './MongoAccess';

export default class Users extends MongoAccess<UserToken> {

    constructor(context: Db) {
        super(context, 'userTokens');
    }

    async insertOne (insertDoc: Pick<UserToken, 'userId'>): Promise<UserToken | null> {
        const createdUserToken = createUserToken({ userId: insertDoc.userId });

        if (createdUserToken === null) return null;

        return await super.insertOne(createdUserToken);
    }
}