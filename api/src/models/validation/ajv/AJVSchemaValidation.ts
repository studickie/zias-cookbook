import Ajv, { ValidateFunction } from 'ajv';
import ISchemaValidation from '../../../types/ISchemaValidation';

class AJVSchemaValidation<T> implements ISchemaValidation<T> {
    validate: ValidateFunction;

    constructor(ajv: Ajv, schema: T) {
        this.validate = ajv.compile(schema)
    }

    validateSchema (data: T) {
        this.validate(data);

        return this.validate.errors;
    }
}

export default AJVSchemaValidation;