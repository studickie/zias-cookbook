import Mail from "nodemailer/lib/mailer";
import { IMailer } from "..";

export default class NodemailerMailService implements IMailer {

    constructor (
        private _nodemailer: Mail
    ) {}

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