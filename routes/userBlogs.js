import express from 'express';
import { blogPage ,blogLogout ,blogGetCreate ,blogSave } from '../controllers/userBlog.js';

const userBlog  = express.Router();


userBlog.route('/').get(blogPage);


userBlog.route('/logout').get(blogLogout);

userBlog.route('/post').get(blogGetCreate).post(blogSave)


export {userBlog};