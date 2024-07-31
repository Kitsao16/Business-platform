// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            accountType: decoded.accountType
        };
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Authentication token expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Authentication token invalid' });
        }
        res.status(401).json({ message: 'Authentication failed' });
    }
};
