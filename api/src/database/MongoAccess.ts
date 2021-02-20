import { Db, ObjectId, UpdateQuery } from 'mongodb';

type MongoCollection = 
    | 'users' 
    | 'userTokens';

type MongoSchema = { _id: string | number | ObjectId | undefined };

export default abstract class MongoAccess<T extends MongoSchema> {
    protected readonly _context: Db;
    protected readonly _collection: MongoCollection;

    constructor(context: Db, collection: MongoCollection) {
        this._context = context;
        this._collection = collection;
    }

    public async find (filters?: Partial<T>): Promise<T[]> {
        return await this._context.collection(this._collection).find<T>(filters).toArray();
    }

    public async findOne (filters: Partial<T>): Promise<T | null> {
        if (filters._id) { 
            filters._id = new ObjectId(filters._id);
        }

        return await this._context.collection(this._collection).findOne(filters);
    }

    public async insertOne (insertDoc: Omit<T, '_id'>): Promise<T | null> {
        console.log('mongoAccess', insertDoc)
        const response = await this._context.collection(this._collection).insertOne(insertDoc);

        return response.result.ok ? response.ops[0] : null;
    }

    public async updateOne (filters: Partial<T>, updateDoc: any ): Promise<true | null> {
        const response = await this._context.collection(this._collection).updateOne(filters, updateDoc);

        return response.result.ok ? true : null;
    }
}