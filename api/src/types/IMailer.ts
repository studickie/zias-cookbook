interface IMailer {
    sendEmail: (to: string, subject: string, body: string) => Promise<boolean>;
}

export default IMailer;