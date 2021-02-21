import { Router, Request, Response, NextFunction } from 'express';
import IMailService from '../../types/IMailService';
import { AccessConstructor } from '../../database';
import Users from '../../database/Users';
import { IAuthToken } from '../../helpers/authToken';

export default function authRoutes (router: Router, dbAccess: AccessConstructor, mailService: IMailService, tokenService: IAuthToken): Router {

    router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await dbAccess(Users).verifyPassword({ email: req.body.email, pass: req.body.password });
            
            if (user === null) {
                return next(new Error('Incorrect username or password'));
            }

            const token = tokenService.generate({ userId: user._id });

            return res.status(200).json({ message: 'Login succesful', token });

        } catch (e) {
            return next(e);
        }
    });

    router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const matchedUser = await dbAccess(Users).findOne({ email: req.body.email });

            if (matchedUser !== null) {
                return next(new Error('User already exists'));
            }

            const newUser = await dbAccess(Users).create({ email: req.body.email, pass: req.body.password });

            if (newUser === null) {
                return next(new Error('Oops! Something went wrong'));
            }

            if (newUser.verifyEmail !== null) {
                mailService.sendVerificationEmail(newUser.email, newUser.verifyEmail);
            }

            const token = tokenService.generate({ userId: newUser._id });

            return res.status(200).json({ message: 'User created successfuly', token });

        } catch (e) {
            return next(e);
        }
    });

    router.get('/verifyEmail/:token', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await dbAccess(Users).verifyEmail(req.params.token);
                
            if (!response) throw new Error('Invalid token');
            
            return res.status(200).json({ message: 'Successfuly verified' });

        } catch (e) {
            return next(e);
        }
    });

    // router.post('/changePassword', async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //     } catch (e) {   
    //         return next(e);
    //     }
    // });

    return router;
}