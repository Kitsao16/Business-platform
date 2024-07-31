// backend/src/routes/businessRoutes.ts
import express from 'express';
import { createBusiness, getBusiness, updateBusiness, deleteBusiness } from '../controllers/businessController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', getBusiness);
router.post('/', createBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;