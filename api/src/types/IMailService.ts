export default interface IMailService {
    sendEmail: (to: string, subject: string, body: string) => Promise<void>;
    sendVerificationEmail: (email: string, token: string) => void;
}