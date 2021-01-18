import ajv from './ajv'
import AJVSchemaValidation from './ajv/AJVSchemaValidation';
import readSchema from '../../helpers/readSchema';
import UserRequest from '../UserRequest';
import ISchemaValidation from '../../types/ISchemaValidation';

export default (async function (): Promise<ISchemaValidation<UserRequest>> {
    const schema = await readSchema('userRequest');

    if (!schema) {
        throw new Error('Schema "userRequest" not found');
        //! error handler should stop execution
    }

    return new AJVSchemaValidation<UserRequest>(ajv, schema);
}());