import jwt from 'jsonwebtoken';

export interface IAuthToken {
    generate: (data: unknown) => string;
    verify: (token: string) => unknown;
}

export default function authToken (tokenSecret: string): IAuthToken {

    return {
        generate: (data) => {
            return jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: data
            }, tokenSecret);
        },
        verify: (token) => {
            return jwt.verify(token, tokenSecret);
        }
    }
}