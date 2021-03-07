import { NextFunction } from "express";

export default async function useValidateToken(req: Request, res: Response, next: NextFunction) {
    
    return next();
}