import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../helpers/error';
import ErrorHandler from '../utils/errorHandler';

function errorMiddleware(error: ApplicationError, req: Request, res: Response, next: NextFunction) {
    ErrorHandler.handleError(error);
    
    return res.status(error.statusCode).json({
        name: error.name,
        message: error.message
    });
}

export default errorMiddleware;