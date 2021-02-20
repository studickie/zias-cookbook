import { Request, Response, NextFunction } from 'express';

/**
 * Catches promise rejections in Express.js routes and middleware
 * @param fn 
 */
function catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): 
    (req: Request, res: Response, next: NextFunction) => Promise<unknown> {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {   
            return await fn(req, res, next);
        } catch (e) {
            return next(e);
        }
    };
}

export default catchAsync;