import ajv from './ajv'
import AJVSchemaValidation from './ajv/AJVSchemaValidation';
import readSchema from '../../helpers/readSchema';
import UserRequest from '../UserRequest';
import ISchemaValidation from '../../types/ISchemaValidation';

export default (async function validateUserRequest(): Promise<ISchemaValidation<UserRequest> | null> {
    const schema = await readSchema('userRequest');

    if (!schema) return null;

    return new AJVSchemaValidation<UserRequest>(ajv, schema);
}());