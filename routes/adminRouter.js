import express from 'express';
import { handleAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();


adminRouter.route('/').get(handleAdmin);



export {adminRouter};