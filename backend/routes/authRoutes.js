import express from 'express';
const router = express.Router();
import {authUser, registerUser} from '../controllers/authController.js'


router.post('/login', authUser);
router.post('/register', registerUser);
/* router.post('/forgot', forgotPassword);

router.post('/reset/:token', resetToken);
router.post('/reset', resetPassword); */

export default router;