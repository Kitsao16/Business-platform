// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, accountType } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'Email already in use' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, accountType });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
        const token = jwt.sign(
            { id: user._id, email: user.email, accountType: user.accountType },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};