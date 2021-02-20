import { Router, Request, Response, NextFunction } from 'express';
import IMailService from '../../types/IMailService';
import { UserActiveStatus, validatePassword } from '../../models/User';
import jwt from 'jsonwebtoken';
import { AccessConstructor } from '../../database';
import Users from '../../database/Users';
import UserTokens from '../../database/UserToken';

export default function authRoutes (router: Router, dbAccess: AccessConstructor, mailService: IMailService): Router {

    router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await dbAccess(Users).findOne({ email: req.body.email });
            
            if (user === null || !await validatePassword(user.pass, req.body.password)) {
                return next(new Error('Incorrect username or password'));
            }

            const token = jwt.sign({ id: user._id }, 'super!secret?string');

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

            const dbUser = await dbAccess(Users).insertOne({ email: req.body.email, pass: req.body.password });

            if (dbUser === null) {
                return next(new Error('Oops! Something went wrong'));
            }

            const userToken = await dbAccess(UserTokens).insertOne({ userId: (dbUser._id as string) });

            if (userToken === null) {
                /*
                    if userToken's insert has error can the insert be backtracked? 
                        else - provide user with method to report & request new token
                */

                //~ log error
            } else {
                mailService.sendVerificationEmail(dbUser.email, userToken.token);
            }

            return res.status(200).json({ message: 'User created successfuly' });

        } catch (e) {
            return next(e);
        }
    });

    router.get('/verifyEmail', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userToken = await dbAccess(UserTokens).findOne({ token: req.body.token });

            if (userToken === null) {
                return next(new Error('Invalid token'));
            }

            await dbAccess(Users).updateOne({ 
                    _id: userToken.userId 
                }, {
                    $set: {
                        active: UserActiveStatus.active,
                        updatedOn: new Date()
                    }
                });
            
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