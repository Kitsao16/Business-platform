declare module './errors/NotFoundError' {
    class NotFoundError extends Error {
        statusCode: number;
        constructor(message: string);
    }

    export = NotFoundError;
}

declare module './errors/DatabaseError' {
    class DatabaseError extends Error {
        statusCode: number;
        constructor(message: string);
    }

    export = DatabaseError;
}
