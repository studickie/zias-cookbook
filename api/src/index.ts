// ------------------
//  CONFIG

import express from 'express';
import './helpers/db';

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// ------------------
// MIDDLEWARE

import bodyParser from 'body-parser';
import useDb from './middleware/useDb';

app.use(useDb);
app.use(bodyParser.json());

// ------------------
//  ROUTES

import userController from './controllers/userController';

app.use('/api/user', userController);

// ------------------
//  ERROR HANDLING

import errorMiddleware from './middleware/useError';

app.use(errorMiddleware);