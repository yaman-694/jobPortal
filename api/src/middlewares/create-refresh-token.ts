import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import env from '../utils/validateEnv';
dotenv.config();

const createRefreshToken = (_id: string): string => {
    // const userpower= md5(User_Type);
    const maxAge = 30 * 24 * 60 * 60;
    const token = jwt.sign({ _id }, env.TOKEN_HEADER_KEY, {
        expiresIn: maxAge
    });
    return token;
}
export default createRefreshToken;
