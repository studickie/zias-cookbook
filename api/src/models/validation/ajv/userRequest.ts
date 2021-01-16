import { ValidateFunction } from 'ajv';
import ajv from './';
import readSchema from '../../../helpers/readSchema';
import UserRequest from '../../../models/UserRequest';

let schema: UserRequest;

//!! Better error handling needed in the case that schema file is not found;

async function getSchema () {
    schema = await readSchema('userRequest');
}

getSchema();

let validate: ValidateFunction;

function validateUserRequest(data: UserRequest) {
    validate = validate || ajv.compile<UserRequest>(schema);
    validate(data);

    return validate.errors || null;
}

export default validateUserRequest;