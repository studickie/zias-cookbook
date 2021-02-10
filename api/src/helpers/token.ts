import jwt from 'jsonwebtoken';

export function generate (data: unknown): string {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
      }, 'super!secret');
}

export function compare(token: string): unknown {
    return jwt.verify(token, 'super!secret');
}

export function decode(token: string): unknown {
    return jwt.decode(token);
}