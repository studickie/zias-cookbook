import { Router, Request, Response, NextFunction } from 'express';
import { IMailService } from '../../mailer';
import { AccessConstructor } from '../../database';
import Users from '../../database/repos/UsersRepo';
import { IAuthToken } from '../../helpers/authToken';

import { OAuth2Client } from 'google-auth-library';
const clientId = process.env.GOOGLE_CLIENT_ID || '';
const client = new OAuth2Client(clientId);

export default function authRoutes (router: Router, dbAccess: AccessConstructor, mailService: IMailService, tokenService: IAuthToken): Router {

    router.post('/google_signin', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: clientId
            });

            const payload = ticket.getPayload();

            if (!payload || (payload['aud'] !== clientId)) {
                return next(new Error('Invalid token'));
            }

            const googleId = payload['sub'];

            const user = await dbAccess(Users).findOne({ googleId: googleId });
            let token: string;

            if (!user) {
                const newUser = await dbAccess(Users).create({ googleId: googleId });

                if (newUser === null) {
                    return next(new Error('Uh-oh! Something went wrong'));
                }

                token = tokenService.generate({ user: newUser._id });

            } else {
                token = tokenService.generate({ user: user._id });
            }

            return res.status(200).json({ 
                message: 'Successful Google sign-in',
                token: token
             });

        } catch (e) {
            return next(e);
        }
    });

    // router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const user = await dbAccess(Users).verifyPassword({ email: req.body.email, pass: req.body.password });
            
    //         if (user === null) {
    //             return next(new Error('Incorrect username or password'));
    //         }

    //         const token = tokenService.generate({ userId: user._id });

    //         return res.status(200).json({ message: 'Login succesful', token });

    //     } catch (e) {
    //         return next(e);
    //     }
    // });

    // router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const matchedUser = await dbAccess(Users).findOne({ email: req.body.email });

    //         if (matchedUser !== null) {
    //             return next(new Error('User already exists'));
    //         }

    //         const newUser = await dbAccess(Users).create({ email: req.body.email, pass: req.body.password });

    //         if (newUser === null) {
    //             return next(new Error('Oops! Something went wrong'));
    //         }

    //         if (newUser.verifyEmail !== null) {
    //             mailService.sendVerificationEmail(newUser.email, newUser.verifyEmail);
    //         }

    //         const token = tokenService.generate({ userId: newUser._id });

    //         return res.status(200).json({ message: 'User created successfuly', token });

    //     } catch (e) {
    //         return next(e);
    //     }
    // });

    // router.post('/requestResetPassword', async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const response = await dbAccess(Users).requestPasswordReset({ email: req.body.email });

    //         if (!response) {
    //             throw new Error('Oops! Something went wrong');
    //         } 

    //         mailService.sendChangePassword(req.body.email, response.token );

    //         return res.status(200).json({ message: 'Password reset sent' });
            
    //     } catch (e) {
    //         return next(e);
    //     }
    // });

    // router.get('/resetPassword/:token', async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const token = req.params.token;
    //         const pass = req.query.pass?.toString() || '';
    //         const verifyPass = req.query.verifyPass?.toString();

    //         if ((!pass || !verifyPass ) || pass !== verifyPass) {
    //             throw new Error('Values do not match');
    //         }

    //         const response = dbAccess(Users).verifyPasswordReset(token, pass);

    //         if (!response) {
    //             throw new Error('Bad Request');
    //         }

    //         return res.status(200).json({ message: 'Password reset successfuly' });

    //     } catch (e) {
    //         return next(e);
    //     }
    // })

    // router.get('/verifyEmail/:token', async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const response = await dbAccess(Users).verifyEmail(req.params.token);
                
    //         if (!response) throw new Error('Invalid token');
            
    //         return res.status(200).json({ message: 'Successfuly verified' });

    //     } catch (e) {
    //         return next(e);
    //     }
    // });

    return router;
}