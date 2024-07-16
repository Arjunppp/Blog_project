

import express from 'express';
import { handleAdminMainPage ,handleAdminLogOut  ,handlegetTheUser ,handleUpdateUser, handleDeleteUser } from '../controllers/adminBlogController.js';
import { handleDeleteBlog, handleGetAllMyBlogs, handleUpdateBlog, handleViewBlog } from '../controllers/userBlog.js';


const adminBlogRouter = express.Router();


adminBlogRouter.route('/' ).get(handleAdminMainPage);

adminBlogRouter.route('/logout').get(handleAdminLogOut);


adminBlogRouter.route('/posts/:id').get(handleGetAllMyBlogs);//handleGetAllMyBlogs --blog
 //handleGetAllUserPost --orginal

adminBlogRouter.route('/:id').get(handlegetTheUser).put(handleUpdateUser).delete(handleDeleteUser);

adminBlogRouter.route('/individual/:id').get(handleViewBlog).delete(handleDeleteBlog).put(handleUpdateBlog);

export {adminBlogRouter};
