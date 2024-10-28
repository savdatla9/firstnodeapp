const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/crud';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url).then(() => {
    app.listen(8100, () => {
        console.log('Server open http://localhost:8100/');
    });
}).catch((err) => {
    console.log(err);
});

const userRouter = require('./routes/users');
const arRouter = require('./routes/ar');
app.use('/api/users', userRouter);
app.use('/api/ar', arRouter);