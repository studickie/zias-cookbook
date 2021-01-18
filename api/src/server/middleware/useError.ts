import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../../helpers/error';
import { handleError } from '../../utils/errorHandler';

function useError (error: ApplicationError, req: Request, res: Response, next: NextFunction): Response<unknown> {
    handleError(error);
    
    return res.status(error.statusCode || 500).json({
        name: error.name,
        message: error.message
    });
}

export default useError;