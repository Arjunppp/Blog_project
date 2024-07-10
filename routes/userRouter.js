import express from 'express';
import { handleRootPage , handleRegisterGet , handleRegisterPost ,handleLogin} from '../controllers/userController.js';

const userRouter  = express.Router();

userRouter.route('/').get(handleRootPage);

userRouter.route('/login').post(handleLogin);

userRouter.route('/register').get(handleRegisterGet).post(handleRegisterPost);




export {userRouter};