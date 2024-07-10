import express from 'express';
import { blogPage ,blogLogout } from '../controllers/userBlog.js';

const userBlog  = express.Router();


userBlog.route('/').get(blogPage);


userBlog.route('/logout').get(blogLogout);


export {userBlog};