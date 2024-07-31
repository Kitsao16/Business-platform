import express, { Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import businessRoutes from './routes/businessRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import passport from './config/passport';

// Load environment variables from .env file
dotenv.config();

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined in environment variables');
}

const app = express();

// Security middleware
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger middleware
app.use(morgan('combined'));

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting to prevent abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Increase limit to 200 requests per windowMs
    message: { message: 'Too many requests, please try again later.' }
});

app.use('/api/', apiLimiter);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Catch-all handler to serve the frontend index.html for any other routes
app.get('*', (_req: Request, _res: Response) => {
    _res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing HTTP server.');
    server.close(() => {
        console.log('HTTP server closed.');
    });
});

