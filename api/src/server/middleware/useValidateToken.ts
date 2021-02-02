import { compare } from '../../helpers/token';
import ApplicationError from '../../helpers/error/ApplicationError';
import catchAsync from "../helpers/catchAsync";

export default catchAsync(async function useValidateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || !compare(token)) {
        return next(new ApplicationError("Not Authorized", 401));
    }
    
    return next();
});