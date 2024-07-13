import express from 'express';
import {  userRouter} from './routes/userRouter.js';
import { adminRouter } from './routes/adminRouter.js';
import { userAuth } from './middlewares/userAuthMiddleware.js';
import { dbConnection } from './connection.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { userBlog } from './routes/userBlogs.js';
import { adminBlogRouter } from './routes/adminBlogRouter.js';
import { adminAuth } from './middlewares/adminAuthMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = process.env.PORT;
const app =express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine' ,'ejs');
app.set('views', './views');
app.use('/public', express.static('public'));

await dbConnection(process.env.MONGO_URI);

app.use('/' ,userRouter);

app.use('/admin' , adminRouter);

app.use('/blog' , userAuth , userBlog);  //userAuth


app.use('/admin/blog' , adminAuth ,adminBlogRouter);    ///Add an middleware where others cant acess

app.listen(port ,() => 
{
    console.log('Application running on port' ,port);
})