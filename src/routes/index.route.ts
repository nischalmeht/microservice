import { Router } from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';

const router = Router();

/** GET /api/health-check */
router.get('/health-check', (_req, res) => {
  res.send('OK');
});

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
