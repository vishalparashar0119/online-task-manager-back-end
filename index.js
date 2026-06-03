import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

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