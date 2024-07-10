import express from 'express';
import { handleRootPage , handleRegisterGet , handleRegisterPost} from '../controllers/userController.js';

const userRouter  = express.Router();

userRouter.route('/').get(handleRootPage);

userRouter.route('/register').get(handleRegisterGet).post(handleRegisterPost);




export {userRouter};