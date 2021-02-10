import { IMailer } from ".";
import * as Token from '../token';

export interface IMailerVerifyNewUser {
    userEmail: string;
    userId: string;
}

export default function mailerVerifyNewUser(mailService: IMailer, args: IMailerVerifyNewUser): void {
    const token = Token.generate({ userId: args.userId });

    const verifyUrl = `<a href='http://localhost:4000/auth/verify/${token}'>Verify Now</a>`;

    mailService.sendEmail(args.userEmail, 'Zia\'s Cookbook Verify Email', verifyUrl);

    return;
}