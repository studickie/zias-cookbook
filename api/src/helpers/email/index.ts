import { EventEmitter } from 'events';
import transporter from './verifyEmail';
import * as Token from '../token';

const emailEvent = new EventEmitter();

interface INewUserEvent {
    userEmail: string;
    userId: string;
}

emailEvent.on('newUser', async ({ userEmail, userId }: INewUserEvent) => {
    try {
        console.log('send email');

        const token = Token.generate({ userId });

        const info = await transporter().sendMail({
            from: 'voodoohairdoo@gmail.com',
            to: userEmail,
            subject: 'verify email',
            text: 'Plaintext version of email',
            html: `<a href='http://localhost:4000/auth/verify/${token}'>Verify Now</a>`
        });

        console.log('message sent', info);
    } catch (e) {
        console.log('Error - sendVerification', e);
    }
});

export default emailEvent;