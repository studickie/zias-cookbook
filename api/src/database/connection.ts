import { MongoClient, ObjectId } from 'mongodb';

type MongoCollection =
    | 'users'
    | 'recipies';

const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const client =  new MongoClient(`mongodb://${dbUser}:${dbPass}@${dbUrl}/${dbName}`, {
    useUnifiedTopology: true
});

export async function connect () {
    await client.connect();

    console.log('Connection success');
}

export async function findCollection (col: MongoCollection): Promise<unknown> {
    try {
        const response = await client.db(`${dbName}`).collection(col).find().toArray();

        return response;

    } catch (e) {
        console.log('Error - findCollection', new Error(e));
    }
}

export async function findInCollection (col: MongoCollection, fieldName: string, fieldValue: any): Promise<unknown> {
    try {

        if (fieldName == '_id') {
            fieldValue = new ObjectId(fieldValue);
        }

        const response = await client.db(`${dbName}`).collection(col).findOne({ [fieldName]: fieldValue });

        return response;

    } catch (e) {
        console.log('Error - findInCollection', new Error(e));
    }
}