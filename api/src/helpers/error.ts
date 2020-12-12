import StatusCode from '../types/statusCode';

/*
*   Node.js Error class: nodejs.org/api/errors.html#errors_new_error_message
*   ------------------------------------------------------------------------
*   Building out error classes: 
*       -> smashingmagazine.com/2020/08/error-handling-nodejs-error-classes
*       -> toptal.com/nodejs/node-js-error-handling
*       -> joyent.com/node-js/production/design/errors
*/

class ApplicationError extends Error {
    constructor(
        public statusCode: StatusCode,
        message: string
    ) {
        super(message);
    }

    get name(): string {
        return this.constructor.name;
    }
}

export default ApplicationError;