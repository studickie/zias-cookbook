import path from 'path';
import fs from 'fs';
import { handleError } from '../utils/errorHandler';
import UserRequest from '../models/UserRequest';
import ProjectSchema from '../types/ProjectSchema';

const fsPromise = fs.promises;
const nodePath = process.env.NODE_PATH || '';

function readSchema(schemaName: 'userRequest'): Promise<UserRequest | undefined>;
async function readSchema (schemaName: ProjectSchema): Promise<unknown | undefined> {
    try {

        const filePath = path.join(nodePath, `/schemas/${schemaName}.json`)

        const data = await fsPromise.readFile(filePath, 'utf8');

        if(!data) {
            //! define a new type of error
            //! define a logging action for this type of error
            throw new Error(`Schema "${schemaName}" not found at "${filePath}"`);
        }

        return JSON.parse(data);

    } catch (e) {
        handleError(e);
    }
} 

export default readSchema;