import bcrypt from 'bcrypt';
import crypto from 'crypto';

export enum UserActiveStatus {
    unverified = 0,
    active,
    disabled
}

export default interface User {
    _id: string;
    email: string;
    pass: string;
    createdOn: Date;
    updatedOn: Date;
    active: UserActiveStatus;
    verifyEmail: string | null;
    verifyEmailCreatedOn: Date | null;
}

export async function validatePassword (hash: string, password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        // TODO: log error

        return false;
    }
}

type CreateUser = Omit<User, '_id'>;

export async function createUser (args: Pick<User, 'email' | 'pass'>): Promise<CreateUser | null> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(args.pass, salt);

        const currentDate = new Date();

        const verifyToken = crypto.randomBytes(256).toString('hex');
        const verifyExp = currentDate;

        return {
            email: args.email,
            pass: hash,
            createdOn: currentDate, 
            updatedOn: currentDate,
            active: UserActiveStatus.unverified,
            verifyEmail: verifyToken,
            verifyEmailCreatedOn: verifyExp
        };

    } catch (e) {
        // TODO; log error;

        return null;
    }
}