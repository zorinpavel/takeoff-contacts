const express = require('express');
const cors = require('cors');

require('./db/mongoose');


const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const userRouter = require('./routers/user');
const contactRouter = require('./routers/contact');

app.use(userRouter);
app.use(contactRouter);

module.exports = app;
