import express from 'express';
import authRoutes from './auth';

const router = express.Router();

// => API /data/

router.use('/auth', authRoutes);

export default router;
