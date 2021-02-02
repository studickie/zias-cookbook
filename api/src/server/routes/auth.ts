import bcrypt from 'bcrypt';
import ApplicationError from "../../helpers/error/ApplicationError";
import catchAsync from "../helpers/catchAsync";
import * as UserController from '../../controllers/userController';
import * as Token from '../../helpers/token';

export const signup = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserController.findUser('email', email);

    if (user) {
        return next(new ApplicationError('User already exists', 400));
    }

    const newUser = await UserController.insertUser({email, password});

    if (!newUser) {
        return next(new ApplicationError('Failed to create new user', 500));
    }

    const token = Token.generate({ _id: newUser._id });

    return res.status(200).json({ "user": newUser, "token": token });
});

export const signin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserController.findUser("email", email);

    if (!user || await bcrypt.compare(user.hash, password)) {
        return next(new ApplicationError("Not Authorized", 401));
    }

    const token = Token.generate({ _id: user._id });

     return res.status(200).json({ "user": user, "token": token });
});