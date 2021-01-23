import express from 'express';
import bodyParser from 'body-parser';
import useError from './middleware/useError';
import usersRoutes from './routes/users';

import { connect } from '../database/connection';
import ApplicationError from '../helpers/error';
import { handleError } from '../utils/errorHandler';

async function main() {
    try {
        // Db Connection
        await connect();

        // Framework configuration
        const app = express();

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });

        // Middleware
        app.use(bodyParser.json());

        // Routes
        app.use('/users', usersRoutes);

        // Catch error
        app.use(useError);

    } catch (e) {
        handleError(new ApplicationError(e));
    }
}

main();