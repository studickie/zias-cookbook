import { EventEmitter } from 'events';
import nodemailerStartup from './nodemailer';
import NodemailerMailService from './nodemailer/NodemailerMailService';
import mailerVerifyNewUser, { IMailerVerifyNewUser } from './mailerVerifyNewUser';

export interface IMailer {
    sendEmail: (to: string, subject: string, body: string) => Promise<void>;
}

const mailHost = process.env.MAIL_HOST || '';
const mailUser = process.env.MAIL_USER || '';
const mailPass = process.env.MAIL_PASS || '';

const nodemailer = nodemailerStartup(mailHost, mailUser, mailPass);
const mailService = new NodemailerMailService(nodemailer);

const emailEvent = new EventEmitter();

emailEvent.on('newUser', (args: IMailerVerifyNewUser) => mailerVerifyNewUser(mailService, args));

export default emailEvent;