import express from 'express';

const app = express();
const port = 3001;

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