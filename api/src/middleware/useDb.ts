import { Request, Response, NextFunction } from 'express';
import getContext from '../helpers/db';

const useDb = (req: Request, res: Response, next: NextFunction) => {
    req.dbContext = getContext();

    next();
}

export default useDb;