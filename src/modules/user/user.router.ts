import express from 'express';
import { UserController } from './user.controller';
import dataValidator from '../../middlewares/dataValidator';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
    '/create-user',
    // dataValidator(userValidation.createUserValidationSchema),
    UserController.createUser);
router.get('/all-users', UserController.getAllUser);
router.get('/:id', UserController.getSingleUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const UserRouter = router;
