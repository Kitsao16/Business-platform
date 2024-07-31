// backend/src/routes/authRoutes.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { register, login } from '../controllers/authController';
import { User as UserType } from '../types/User';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/refresh-token', (req: Request, res: Response) => {
    const user = req.user as UserType;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const newToken = jwt.sign(
        { id: user.id, email: user.email, accountType: user.accountType },
        jwtSecret,
        { expiresIn: '1h' }
    );

    res.json({ token: newToken });
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req: Request, res: Response) => {
    const user = req.user as UserType;
    if (user) {
        const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
        const token = jwt.sign(
            { id: user.id, email: user.email, accountType: user.accountType },
            jwtSecret,
            { expiresIn: '1h' }
        );
        res.redirect(`/dashboard?token=${token}`);
    } else {
        res.redirect('/login');
    }
});

export default router;