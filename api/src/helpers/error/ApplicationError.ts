/*
*   Node.js Error class: nodejs.org/api/errors.html#errors_new_error_message
*   ------------------------------------------------------------------------
*   Building out error classes: 
*       -> smashingmagazine.com/2020/08/error-handling-nodejs-error-classes
*       -> toptal.com/nodejs/node-js-error-handling
*       -> joyent.com/node-js/production/design/errors
*/

type StatusCode = 400 | 401 | 404 | 500;

export class ApplicationError extends Error {
    public isOpError: boolean;

    constructor(
        public message = 'Oops! Something went wrong.',
        public statusCode: StatusCode = 500
    ) {
        super(message);

        this.isOpError = true;

        Error.captureStackTrace(this, ApplicationError);
    }

    get name(): string {
        return this.constructor.name;
    }
}

export default ApplicationError;

/*
*   Application Error
    TODO: create error object for Mongo errors, add logging for MongoDB errors which is separate from rest of application
    TODO: create error object for internal operations, like controllers. add logging 
*/