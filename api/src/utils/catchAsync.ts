import { Request, Response, NextFunction } from 'express';

type fn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

function catchAsync (fn: fn): fn {
    return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch((e) => {
        next(e);
    });
}

export default catchAsync;