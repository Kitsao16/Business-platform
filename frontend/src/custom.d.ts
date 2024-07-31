// custom.d.ts
declare module 'cors';
declare module 'dotenv';

declare namespace Express {
    interface Request {
        user?: {
            id: number;
            email: string;
            accountType: string;
        };
    }
}
