import { config } from 'dotenv';
import jwt from 'jsonwebtoken';


config()
export class IToken{
    // Function to generate access token
    generateAccessToken = (user: { id: string; name: string, email: string, expiry: number }) => {
        const payload = { id: user.id, username: user.name, email: user.email, expres: user.expiry };
        const secretKey: string = process.env.JWT_SECRET_KEY!;

        const expiresIn = '1d'; // Access token expires in 15 minutes

        return jwt.sign(payload, secretKey, { expiresIn });
    };


    // Function to generate refresh token
    generateRefreshToken = (user: { id: string; name: string, email: string, expiry: number }) => {
        const payload = { id: user.id, username: user.name, email: user.email, expres: user.expiry };
        const secretKey: string = process.env.REFRESH_JWT_SECRET_KEY!;
        const expiresIn = '10d'; // Refresh token expires in 10 days

        return jwt.sign(payload, secretKey, { expiresIn });
    };

    verifyJWTToken = (token: string): { message: string, status: boolean, data: any } => {
        const secretKey: string = process.env.JWT_SECRET_KEY!;
        let result: any = { message: 'Invalid token', status: false, data: undefined };
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) return result = { message: 'Invalid token', status: false, data: undefined };
            return result = { message: 'token validated', status: true, data: decoded };
        });
        return result;
    }

    verifyRefreshJWTToken = (refreshToken: string): { message: string, status: boolean, data: any } => {
        const secretKey: string = process.env.REFRESH_JWT_SECRET_KEY!;
        let result: any = { message: 'Invalid refresh token', status: false, data: undefined };
        jwt.verify(refreshToken, secretKey, (err, decoded) => {
            console.log(decoded);
            if (err) return result = { message: 'Invalid refresh token', status: false, data: undefined };
            return result = { message: 'refresh token validated', status: true, data: decoded };
        });

        return result;
    }

}