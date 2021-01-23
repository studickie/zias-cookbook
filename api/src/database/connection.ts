import { MongoClient, ObjectId } from 'mongodb';
import { handleError } from '../utils/errorHandler';
import ApplicationError from '../helpers/error';

type MongoCollection =
    | 'users'
    | 'recipies';

const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const client = new MongoClient(`mongodb://${dbUser}:${dbPass}@${dbUrl}/${dbName}`, {
    useUnifiedTopology: true
});

export async function connect() {
    await client.connect();

    console.log('Connection success');
}

export async function findCollection<T>(col: MongoCollection): Promise<T[] | undefined | null> {
    try {
        const response = await client.db(dbName).collection(col).find<T>().toArray();

        return response;

    } catch(e) {
        handleError(new ApplicationError(e));
    }
}

export async function findInCollection<T>(col: MongoCollection, fieldName: string, fieldValue: any): Promise<T | undefined | null> {
    try {
        if (fieldName == '_id') {
            fieldValue = new ObjectId(fieldValue);
        }
    
        const response = await client.db(dbName).collection(col).findOne<T>({ [fieldName]: fieldValue });
    
        return response;

    } catch (e) {
        handleError(new ApplicationError(e));
    }
}

export async function insertIntoCollection<T>(col: MongoCollection, document: unknown): Promise<T | undefined | null> {
    try {
        const response = await client.db(dbName).collection(col).insertOne(document);

        return response.result.ok
            ? response.ops[0]
            : null;

    } catch(e) {
        handleError(new ApplicationError(e));
    }
}