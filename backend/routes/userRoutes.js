import express from 'express';
import {
  loginUser,
  registerUser,
} from '../controllers/userController.js';

const router = express.Router();

// User login and registration routes
router.post('/login', loginUser);
router.post('/register', registerUser);


export default router;