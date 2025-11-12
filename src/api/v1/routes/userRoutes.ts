import express from 'express';
import * as userController from '../controllers/userController';
import { validateRequest } from '../middleware/validate';
import { userSchemas } from '../validation/schemas';

const router = express.Router();

router.post('/', validateRequest(userSchemas.create), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateRequest(userSchemas.update), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
