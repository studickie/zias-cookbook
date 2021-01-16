import path from 'path';
import fs from 'fs';
import { handleError } from '../utils/errorHandler';
import UserRequest from '../models/UserRequest';

const fsPromise = fs.promises;
const nodePath = process.env.NODE_PATH;

type ProjectSchema = 
    | 'userRequest';

function readSchema(schemaName: 'userRequest'): Promise<UserRequest>;
async function readSchema (schemaName: ProjectSchema): Promise<unknown> {
    try {

        if (nodePath == undefined) {
            throw new Error('Undefined path');
        }

        const data = await fsPromise.readFile(path.join(nodePath, `/schemas/${schemaName}.json`), 'utf8');

        if(!data) {
            throw new Error('Document not found');
        }

        return JSON.parse(data);

    } catch (e) {
        handleError(e);
    }
} 

export default readSchema;