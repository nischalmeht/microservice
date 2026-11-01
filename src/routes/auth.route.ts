import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { paramValidation } from './param-validation';

const router = Router();

router.post('/login', validate(paramValidation.login), authCtrl.login);
router.get('/random-number', requireAuth, authCtrl.getRandomNumber);

export default router;
