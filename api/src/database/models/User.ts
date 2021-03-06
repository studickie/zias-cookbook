// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
export interface DbUser {
    _id: string;
    googleId: string;
    createdOn: Date;
    updatedOn: Date;
}

export type DbUserAuthCredentials = Pick<DbUser, 'googleId'>;

export default class User {

    public static create (args: DbUserAuthCredentials): Omit<DbUser, '_id'> {
        const currentDate = new Date();

        return {
            googleId: args.googleId,
            createdOn: currentDate,
            updatedOn: currentDate
        }
    }
}


// export enum DbUserActiveStatus {
//     unverified = 0,
//     active,
//     disabled
// }

// export interface DbUser {
//     _id: string;
//     email: string;
//     pass: string;
//     createdOn: Date;
//     updatedOn: Date;
//     active: DbUserActiveStatus;
//     verifyEmail: string | null;
//     verifyEmailCreatedOn: Date | null;
//     verifyPass: string | null;
//     verifyPassCreatedOn: Date | null;
// }

// type CreateDbUser = Omit<DbUser, '_id'>;
// export type DbUserAuthCredentials = Pick<DbUser, 'email' | 'pass'>;

// export default class User {

//     public static async encrypt (value: string): Promise<string> {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(value, salt);

//         return hash;
//     }

//     public static async validatePassword (hash: string, password: string): Promise<boolean> {
//         try {
//             return await bcrypt.compare(password, hash);
//         } catch (e) {
//             // TODO: log error
    
//             return false;
//         }
//     }
    
//     public static async create (args: DbUserAuthCredentials): Promise<CreateDbUser | null> {
//         try {
//             const hash = await this.encrypt(args.pass);
    
//             const currentDate = new Date();
    
//             const verifyToken = crypto.randomBytes(256).toString('hex');
//             const verifyExp = currentDate;
    
//             return {
//                 email: args.email,
//                 pass: hash,
//                 createdOn: currentDate, 
//                 updatedOn: currentDate,
//                 active: DbUserActiveStatus.unverified,
//                 verifyEmail: verifyToken,
//                 verifyEmailCreatedOn: verifyExp,
//                 verifyPass: null,
//                 verifyPassCreatedOn: null
//             };
    
//         } catch (e) {
//             // TODO; log error;
    
//             return null;
//         }
//     }

// }