import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export default function configureNodemailer (): Mail {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            secure: false,
            auth: {
              user: "31c3fe95f401b8",
              pass: "865236630458f6"
            }
          });

        return transporter;

    } catch (e) {
        console.log('Error - configure nodemailer', e);

        process.exit(1);
    }
}