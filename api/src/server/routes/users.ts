import express from 'express';
import catchAsync from '../../utils/catchAsync';
import * as userController from '../../controllers/userController';
import ApplicationError from '../../helpers/error';

import useValidateUserRequest from '../middleware/useValidateUserRequest';

const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
    const userList = await userController.findUsers();

    if (!userList) {
        throw new ApplicationError('Bad Request', 400);
    }

    return res.status(200).json({ "users": userList });
}));

router.get('/:id', catchAsync(async (req, res) => {

    const { id } = req.params;

    if (!id) {
        throw new ApplicationError('Bad Request', 400);
    }

    const user = await userController.findUser('_id', id);

    if (!user) {
        throw new ApplicationError('Not Found', 404);
    }

    return res.status(200).json({ "user": user });
}));

router.post('/', useValidateUserRequest, catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await userController.createUser({ email, password });

    if (!user) {
        throw new ApplicationError('Bad Request', 400);
    }

    return res.status(200).json({ "new_user": user });
}));

export default router;