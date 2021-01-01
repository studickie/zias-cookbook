import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../helpers/error';

type fn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function catchAsync (fn: fn): fn {
    return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch((e) => {
        next(new ApplicationError(e));
    });
}

export default catchAsync;