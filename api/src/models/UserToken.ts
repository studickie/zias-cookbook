import crypto from 'crypto';

export default interface UserToken {
    _id: string;
    userId: string;
    token: string;
    createdOn: Date;
}

type CreateUserToken = Omit<UserToken, '_id'>;

export function createUserToken (args: Pick<UserToken, 'userId'>): CreateUserToken | null {
    let userToken: CreateUserToken | undefined;
    
    crypto.randomBytes(256, (err, buf) => {
        if (err) {
            //~ log error

            return;
        }

        userToken = {
            userId: args.userId,
            token: buf.toString('hex'),
            createdOn: new Date()
        }
    });

    return userToken || null;
}