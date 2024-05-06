import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { hash, compare } = bcrypt;
const { sign, verify } = jwt;


class AuthService {

    async passwordHash(password) {
        return hash(password, 10);
    }

    async passwordCompare (text, encript) {
        return compare(text, encript);
    }
    
    async generateToken(user) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const expiresIn = process.env.JWT_EXPIRES_IN;
        const token = sign({ user }, secretKey, { expiresIn });
        return token;
    }

    async decodeToken(token) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const credential = verify(token, secretKey);
        return credential;
    }
}

export const authService = new AuthService();