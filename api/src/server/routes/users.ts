import catchAsync from '../helpers/catchAsync';
import * as UserController from '../../controllers/userController';
import ApplicationError from '../../helpers/error/ApplicationError';

export const get = catchAsync(async (req, res) => {
    const userList = await UserController.findUsers();

    return res.status(200).json({ "users": userList });
});

export const getById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await UserController.findUser('_id', id);

    if (!user) {
        return next(new ApplicationError('No user with matching parameters found', 404));
    }

    return res.status(200).json({ "user": user });
});