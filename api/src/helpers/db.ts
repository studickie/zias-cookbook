import { Db, MongoClient } from 'mongodb';
import { handleError } from '../utils/errorHandler';
import ApplicationError from './error';

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbUrl = process.env.DB_URL;

const client =  new MongoClient(`mongodb://${dbUser}:${dbPass}@${dbUrl}/ziasCookbook`, {
    useUnifiedTopology: true
});

async function run () {
    await client.connect();

    console.log('Connection success');
}

run().catch((e) => {
    handleError(new ApplicationError(e));
});

export default (): Db => client.db('ziasCookbook');