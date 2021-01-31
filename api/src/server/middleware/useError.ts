import { Request, Response, NextFunction } from 'express';
import logEvent from '../../logger';
import ApplicationError from '../../helpers/error/ApplicationError';

function useError (error: ApplicationError, req: Request, res: Response, next: NextFunction): Response<unknown> {
    logEvent.emit('error', error);
    
    return res.status(error.statusCode || 500).json({
        name: error.name,
        message: error.message
    });
}

export default useError;