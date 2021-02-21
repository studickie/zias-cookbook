import nodemailer from 'nodemailer';
import NodemailerService from './NodemailerService';

export interface IMailService {
    sendEmail: (to: string, subject: string, body: string) => Promise<void>;
    sendVerificationEmail: (email: string, token: string) => void;
    sendChangePassword(email: string, token: string): void;
}

export default function nodemailerStartup (mailHost: string, mailUser: string, mailPass: string): IMailService {
    const transporter = nodemailer.createTransport({
        host: mailHost,
        port: 2525,
        secure: false,
        auth: {
            user: mailUser,
            pass: mailPass
        }
    }, {
        from: 'no_reply@ziascookbook.ca'
    });
    
    transporter.verify((err) => {
        if (err) {
            // TODO: add log event

            console.log('Error - NodemailerMailService', err);
        }
    });

    return new NodemailerService(transporter);
}