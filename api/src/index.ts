// ------------------
//  CONFIG

import express from 'express';
import ApplicationError from './helpers/error';

const app = express();

// ------------------
// MIDDLEWARE

import bodyParser from 'body-parser';

app.use(bodyParser.json());

// ------------------
//  ROUTES

import catchAsync from './utils/catchAsync';

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Request success!' });
});

app.get('/error', catchAsync((req, res, next) => {
    throw new ApplicationError('Test error', 400);
}));

// ------------------
//  ERROR HANDLING

import errorMiddleware from './middleware/errorMiddleware';

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});