import Mail from "nodemailer/lib/mailer";
import IMailService from "../types/IMailService";

export default class NodemailerService implements IMailService {
    private _nodemailer: Mail

    constructor (nodemailer: Mail) {
        this._nodemailer = nodemailer;
    }

    sendVerificationEmail(email: string, token: string): void {
        const verifyUrl = `<a href='http://localhost:4000/auth/verify/${token}'>Verify Now</a>`;

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