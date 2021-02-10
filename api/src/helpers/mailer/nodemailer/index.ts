import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export default function nodemailerStartup (mailHost: string, mailUser: string, mailPass: string): Mail {
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
            console.log('Error - NodemailerMailService', err);
        }
    });

    return transporter;
}