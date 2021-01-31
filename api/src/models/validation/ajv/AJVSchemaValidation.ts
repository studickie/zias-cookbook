import Ajv, { ValidateFunction } from 'ajv';
import ISchemaValidation from '../../../types/ISchemaValidation';

class AJVSchemaValidation<T> implements ISchemaValidation<T> {
    validate: ValidateFunction<T>;

    constructor(ajv: Ajv, schema: T) {
        this.validate = ajv.compile<T>(schema);
    }

    validateSchema (data: T): unknown {
        this.validate(data);

        return this.validate.errors || null;
    }
}

export default AJVSchemaValidation;