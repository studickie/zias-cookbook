import Mail from "nodemailer/lib/mailer";
import { IMailService } from './';

export default class NodemailerService implements IMailService {
    private _nodemailer: Mail

    constructor (nodemailer: Mail) {
        this._nodemailer = nodemailer;
    }

    sendChangePassword(email: string, token: string): void {
        const newPass = 'new!Pass?1234';

        const verifyUrl = `a href=http://localhost:4000/auth/resetPassword/${token}/?pass=${newPass}&verifyPass=${newPass}`;

        this.sendEmail(email, 'Zia\'s Cookbook - Reset Password', verifyUrl);
    }

    sendVerificationEmail(email: string, token: string): void {
        const verifyUrl = `<a href='http://localhost:4000/auth/verifyEmail/${token}'>Verify Now</a>`;

        this.sendEmail(email, 'Zia\'s Cookbook - Verify Email', verifyUrl);
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        try {
            await this._nodemailer.sendMail({
                to: to,
                subject: subject,
                text: 'Plaintext version of email',
                html: body
            });

            return;

        } catch (e) {
            console.log('Error - sendEmail', e);

            return;
        }
    }
}