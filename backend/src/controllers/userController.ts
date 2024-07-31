// src/controllers/userController.ts

import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};