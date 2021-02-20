import { MongoClient, Db } from 'mongodb';

export type AccessConstructor = <T>(C: new (db: Db) => T) => InstanceType<typeof C>;

export default async function dbConnect(dbHost: string, dbName: string, dbUser: string, dbPass: string): Promise<AccessConstructor> {
    
    const client = new MongoClient(`mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`, {
        useUnifiedTopology: true
    });

    await client.connect();

    return <T>(C: new (db: Db) => T) => new C(client.db(dbName));
}