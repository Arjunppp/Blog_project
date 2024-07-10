import express from 'express';
import { handleAdmin ,handleAdminLogin } from '../controllers/adminController.js';

const adminRouter = express.Router();


adminRouter.route('/').get(handleAdmin);

adminRouter.route('/login').post(handleAdminLogin);



export {adminRouter};