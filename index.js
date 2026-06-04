import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDb } from './database/dataBase.js';
import userRouter from './routes/userRouter.js'
import taskRouter from './routes/taskRouter.js';
import './shedulars/emailSheduler.js';

const app = express();
const port = 3001;
await connectDb();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


// routes for user admin crud
app.use('/user',userRouter)
app.use('/task',taskRouter)

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'backend server is running',
        data: null
    });
});

app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}`)
});