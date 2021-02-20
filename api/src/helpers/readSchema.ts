import path from 'path';
import fs from 'fs';
import CreateUserRequest from '../models/CreateUserRequest';
import ProjectSchema from '../types/ProjectSchema';
import logEvent from '../logger'

const fsPromise = fs.promises;
const nodePath = process.env.NODE_PATH || '';

function readSchema(schemaName: 'createUserRequest'): Promise<CreateUserRequest | null>;
async function readSchema (schemaName: ProjectSchema): Promise<unknown | null> {
    try {
        const filePath = path.join(nodePath, `/schemas/${schemaName}.json`)

        const data = await fsPromise.readFile(filePath, 'utf8');

        return JSON.parse(data);

    } catch (e) {
        logEvent.emit('error', e);

        return null;
    }
} 

export default readSchema;