import { Request, Response, NextFunction } from 'express';
import validateUserRequest from '../../models/validation/ajv/userRequest';
import ApplicationError from '../../helpers/error';

function useValidateUserRequest (req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;

    const validate = validateUserRequest({email, password});

    if (validate != null) {
        throw new ApplicationError('Invalid user request', 400);
    }
    
    return next();
}

export default useValidateUserRequest;