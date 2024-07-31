// backend/src/db.ts
import * as dotenv from 'dotenv';
import { MongoClient, Db } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI as string;
if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
});

let db: Db;

export const connectDB = async (): Promise<Db> => {
    if (db) return db;
    try {
        await client.connect();
        db = client.db('business_platform');
        console.log('Connected to MongoDB Atlas');
        return db;
    } catch (error) {
        console.error('Could not connect to MongoDB Atlas', error);
        throw new Error('Database connection failed');
    }
};