import Router from 'express';
import { authenticate } from '../middlewares/auth';
const router = Router();

const userController = require('../controllers/user')


router.post('/user-register', userController.postUser)

router.get('/verify-user/:userId', userController.verifyUser);

router.post('/user-login', userController.loginUser);

router.post('/forget-password', userController.forgetPassword);

router.post('/reset-password', userController.resetPassword)

router.post('/change-password', authenticate, userController.changePassword)



export default router;