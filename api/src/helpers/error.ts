/*
*   Node.js Error class: nodejs.org/api/errors.html#errors_new_error_message
*   ------------------------------------------------------------------------
*   Building out error classes: 
*       -> smashingmagazine.com/2020/08/error-handling-nodejs-error-classes
*       -> toptal.com/nodejs/node-js-error-handling
*       -> joyent.com/node-js/production/design/errors
*/

type TStatusCode = 400 | 401 | 404 | 408 | 500;

class ApplicationError extends Error {
    public isOpError: boolean;

    constructor(
        public message = 'Server error',
        public statusCode: TStatusCode = 500,
    ) {
        super(message);

        this.isOpError = true;
    }

    get name(): string {
        return this.constructor.name;
    }
}

export default ApplicationError;