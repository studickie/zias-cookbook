import ApplicationError from '../helpers/error';
import logger from '../helpers/logger';

class ErrorHandler {
    public static handleError(error: ApplicationError): void {
        
        logger.error({
            name: error.name, 
            message: error.message,
            stack: error.stack || '--no-stack-trace',
        });

        if (error.isOpError == undefined) {
            process.exit(1);
        }
    }
}

export default ErrorHandler;