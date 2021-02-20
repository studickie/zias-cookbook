import validateCreateUserRequest from '../../models/validation/validateCreateUserRequest';
import ApplicationError from '../../helpers/error/ApplicationError';
import catchAsync from '../helpers/catchAsync';

export default catchAsync(async function useValidateCreateUserRequest (req, res, next) {
    const { email, password } = req.body;

    const schema = await validateCreateUserRequest;

    if (!schema) {
        return next(new ApplicationError('Oops! Something went wrong.', 500));
    }

    const response = schema.validateSchema({email, password});

    if (response != null) {
        return next(new ApplicationError('Invalid user request', 400));
    }
    
    return next();
});