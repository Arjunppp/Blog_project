

import express from 'express';
import { handleAdminMainPage } from '../controllers/adminBlogController.js';


const adminBlogRouter = express.Router();


adminBlogRouter.route('/' ).get(handleAdminMainPage);



export {adminBlogRouter};
