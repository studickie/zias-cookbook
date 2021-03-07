import { MongoClient, Db } from 'mongodb';

export type AccessConstructor = <T>(Repo: new (db: Db) => T) => InstanceType<typeof Repo>;

export default async function dbConnect(dbHost: string, dbName: string, dbUser: string, dbPass: string): Promise<AccessConstructor> {
    
    const client = new MongoClient(`mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`, {
        useUnifiedTopology: true
    });

    await client.connect();

    return (Repo) => new Repo(client.db(dbName));
}