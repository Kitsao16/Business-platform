// src/routes/userRoutes.ts

import express from 'express';
import { getUser, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all user routes
router.use(authMiddleware);

// Define routes for user operations
router.get('/:id', getUser);
router.put('/:id', updateUser);

export default router;
