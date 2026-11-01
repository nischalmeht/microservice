import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { paramValidation } from './param-validation';

const router = Router();

router
  .route('/')
  .get(validate(paramValidation.listUsers), userCtrl.list)
  .post(validate(paramValidation.createUser), userCtrl.create);

router
  .route('/:userId')
  .get(validate(paramValidation.userById), userCtrl.get)
  .put(validate(paramValidation.updateUser), userCtrl.update)
  .delete(validate(paramValidation.userById), userCtrl.remove);

export default router;
