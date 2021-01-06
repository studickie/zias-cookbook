import express from 'express';
import catchAsync from '../../utils/catchAsync';
import * as userController from '../../controllers/userController';
import ApplicationError from '../../helpers/error';

const router = express.Router();

//~ User
router.get('/user', catchAsync(async function (req, res) {

    const userList = await userController.findUsers();

    return res.status(200).json({ "message": " Hello World", "users": userList });
}));

router.get('/user/:id', catchAsync(async function(req, res) {

    const { id } = req.params;

    if (!id) {
        throw new ApplicationError('Bad Request', 400);
    }

    const user = await userController.findUser('_id', id);

    if (!user) {
        throw new ApplicationError('Not Found', 404);
    }

    return res.status(200).json({ "message": "Hello World", "user": user });
}));

export default router;