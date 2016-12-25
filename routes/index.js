import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';

const router = express.Router();

// => API /data/

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
