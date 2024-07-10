import express from 'express';
import {  userRouter} from './routes/userRouter.js';
import { adminRouter } from './routes/adminRouter.js';
import { dbConnection } from './connection.js';
import 'dotenv/config';



const port = process.env.PORT;
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine' ,'ejs');
app.set('views', './views');
app.use('/public', express.static('public'));

await dbConnection(process.env.MONGO_URI);

app.use('/' ,userRouter);

app.use('/admin' , adminRouter);



app.listen(port ,() => 
{
    console.log('Application running on port' ,port);
})