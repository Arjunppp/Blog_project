

import express from 'express';
import { handleAdminMainPage ,handleAdminLogOut } from '../controllers/adminBlogController.js';


const adminBlogRouter = express.Router();


adminBlogRouter.route('/' ).get(handleAdminMainPage);

adminBlogRouter.route('/logout').get(handleAdminLogOut);



export {adminBlogRouter};
