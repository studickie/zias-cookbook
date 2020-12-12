import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../helpers/error';
import ErrorHandler from '../utils/errorHandler';

async function errorMiddleware (error: Error, req: Request, res: Response, next: NextFunction) {
    if (!ErrorHandler.isOperationalError(error)) {

        //* programmer error; system crash

        process.exit(1);

    } else {
        await ErrorHandler.handleError(error);

        const { statusCode, name, stack } = (error as ApplicationError);
    
        return res.status(statusCode).json({ statusCode, name, stack });
    }
}

export default errorMiddleware;