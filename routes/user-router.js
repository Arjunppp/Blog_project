import express from 'express';
import { handleRootPage , handleRegisterRoute} from '../controllers/user-controller.js';

const userRouter  = express.Router();

userRouter.route('/').get(handleRootPage);

userRouter.route('/register').get(handleRegisterRoute);




export {userRouter};