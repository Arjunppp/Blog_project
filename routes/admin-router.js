import express from 'express';
import { handleAdmin } from '../controllers/admin-controller.js';

const adminRouter = express.Router();


adminRouter.route('/').get(handleAdmin);



export {adminRouter};