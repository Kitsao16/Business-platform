import { Request, Response, NextFunction } from 'express';
import DatabaseError from '../errors/DatabaseError';
import NotFoundError from '../errors/NotFoundError';

const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const error = err as Error;
    console.error(error.stack);

    const response: { message: string; stack?: string } = { message: error.message };

    if (process.env.NODE_ENV === 'development') {
        response.stack = error.stack;
    }

    if (err instanceof NotFoundError) {
        return res.status(err.statusCode || 404).json(response);
    } else if (err instanceof DatabaseError) {
        return res.status(err.statusCode || 500).json(response);
    }

    res.status(500).json({ message: 'Something went wrong!' });
};

export default errorMiddleware;