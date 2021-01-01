//import ApplicationError from '../helpers/error';
import logger from '../helpers/logger';

export function handleError(error: Error): void {

    logger.error({
        name: error.name, 
        message: error.message,
        stack: error.stack || '--no-stack-trace',
    });
}