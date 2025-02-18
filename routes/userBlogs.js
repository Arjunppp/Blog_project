import express from 'express';
import { blogPage ,blogLogout ,blogGetCreate ,blogSave, handleGetAllMyBlogs ,handleDeleteBlog ,handleViewBlog ,handleUpdateBlog} from '../controllers/userBlog.js';

const userBlog  = express.Router();


userBlog.route('/').get(blogPage);


userBlog.route('/logout').get(blogLogout);

userBlog.route('/post').get(blogGetCreate).post(blogSave)


userBlog.route('/viewMine').get(handleGetAllMyBlogs);

userBlog.route('/:id').delete(handleDeleteBlog).get(handleViewBlog).put(handleUpdateBlog)


export {userBlog};