import express from 'express';
import {  userRouter} from './routes/userRouter.js';
import { adminRouter } from './routes/adminRouter.js';
import { userAuth } from './middlewares/userAuthMiddleware.js';
import { dbConnection } from './connection.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { userBlog } from './routes/userBlogs.js';



const port = process.env.PORT;
const app =express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine' ,'ejs');
app.set('views', './views');
app.use('/public', express.static('public'));

await dbConnection(process.env.MONGO_URI);

app.use('/' ,userRouter);

app.use('/admin' , adminRouter);

app.use('/blog' , userAuth , userBlog);

app.listen(port ,() => 
{
    console.log('Application running on port' ,port);
})