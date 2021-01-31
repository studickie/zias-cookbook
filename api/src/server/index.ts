import express from 'express';
import bodyParser from 'body-parser';
import useError from './middleware/useError';
import router from './routes';
import { connect } from '../database/connection';
import logEvent from '../logger';

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
        app.use(router);

        // Catch error
        app.use(useError);

    } catch (e) {
        logEvent.on('error', e);

        process.exit(1);
    }
}

main();