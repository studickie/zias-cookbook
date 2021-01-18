import { Request, Response, NextFunction } from 'express';
import userRequest from '../../models/validation/userRequest';
import ApplicationError from '../../helpers/error';

async function useValidateUserRequest (req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const response = (await userRequest).validateSchema({email, password});

    if (response != null || response != undefined) {
        throw new ApplicationError('Invalid user request', 400);
    }
    
    return next();
}

export default useValidateUserRequest;