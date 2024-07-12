

import express from 'express';
import { handleAdminMainPage ,handleAdminLogOut ,handleGetAllUserPost ,handlegetTheUser ,handleUpdateUser, handleDeleteUser } from '../controllers/adminBlogController.js';


const adminBlogRouter = express.Router();


adminBlogRouter.route('/' ).get(handleAdminMainPage);

adminBlogRouter.route('/logout').get(handleAdminLogOut);


adminBlogRouter.route('/posts/:id').get(handleGetAllUserPost);

adminBlogRouter.route('/:id').get(handlegetTheUser).put(handleUpdateUser).delete(handleDeleteUser);



export {adminBlogRouter};
