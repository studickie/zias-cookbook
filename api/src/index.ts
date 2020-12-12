// ------------------
//  CONFIG

import express from 'express';
import ApplicationError from './helpers/error';
import StatusCode from './types/statusCode';

const app = express();

// ------------------
// MIDDLEWARE

import bodyParser from 'body-parser';

app.use(bodyParser.json());

// ------------------
//  ROUTES

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Request success!' });
});

app.get('/error', async (req, res, next) => {
    try {
        throw new ApplicationError(StatusCode.BAD_REQUEST, 'Test Error');
    } catch (err) {
        next(err);
    }
});

// ------------------
//  ERROR HANDLING

import errorMiddleware from './middleware/errorMiddleware';

app.use(errorMiddleware);

app.listen(4000, () => {
    console.log('App listening on port 4000');
});