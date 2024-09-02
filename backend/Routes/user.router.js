import express from 'express';
import { ragistration, Login } from '../Controller/UserAuthController.js';
import auth from '../middilware/authentication.js';

const router = express.Router();
// const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');

router.post('/register', ragistration);
router.post('/login' , Login);

export default router; 

