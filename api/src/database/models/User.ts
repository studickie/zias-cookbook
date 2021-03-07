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