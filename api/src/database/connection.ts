import { MongoClient, ObjectId } from 'mongodb';
import { UpdateQuery } from 'mongoose';
import DBResponse from '../types/DBResponse';

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

export async function connect(): Promise<void> {
    await client.connect();

    console.log('Connection success');
}

export async function findCollection<T>(col: MongoCollection): Promise<T[]> {

    const response = await client.db(dbName).collection(col).find<T>().toArray();

    return response;
}

export async function findInCollection<T>(col: MongoCollection, fieldName: string, fieldValue: unknown): Promise<T | null> {
    if (fieldName == '_id') {
        fieldValue = new ObjectId((fieldValue as string));
    }

    const response = await client.db(dbName).collection(col).findOne<T>({ [fieldName]: fieldValue });

    return response;
}

export async function insertIntoCollection<T>(col: MongoCollection, document: unknown): Promise<T | null> {
    const response = await client.db(dbName).collection(col).insertOne(document);

    return response.result.ok
        ? response.ops[0]
        : null;
}

export async function updateOneInCollection(col: MongoCollection, fieldName: string, fieldValue: unknown, updateDoc: UpdateQuery<any>): Promise<boolean> {
    if (fieldName == '_id') {
        fieldValue = new ObjectId((fieldValue as string));
    }
    
    const response = await client.db(dbName).collection(col).updateOne({ [fieldName]: fieldValue }, updateDoc);
    
    return response.result.ok ? true : false;
}