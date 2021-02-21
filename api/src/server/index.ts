import express from 'express';
import bodyParser from 'body-parser';
import useError from './middleware/useError';
import authRoutes from './routes/authRoute';
import dbConnect from '../database';
import logEvent from '../logger';
import nodemailerStartup from '../mailer';
import authToken from '../helpers/authToken';

async function main() {
    try {
        // Db Connection
        const dbHost = process.env.DB_HOST || '';
        const dbName = process.env.DB_NAME || '';
        const dbUser = process.env.DB_USER || '';
        const dbPass = process.env.DB_PASS || '';

        const dbAccess = await dbConnect(dbHost, dbName, dbUser, dbPass);

        // Mail Service
        const mailHost = process.env.MAIL_HOST || '';
        const mailUser = process.env.MAIL_USER || '';
        const mailPass = process.env.MAIL_PASS || '';

        const mailService = nodemailerStartup(mailHost, mailUser, mailPass);

        // Token Service
        const secret = process.env.SECRET;

        if (secret === undefined) throw new Error('Variable is undefined');

        const tokenService = authToken(secret);

        // Framework configuration
        const app = express();

        app.use(bodyParser.json());
        
        const router = express.Router();
        app.use('/auth', authRoutes(router, dbAccess, mailService, tokenService));

        app.use(useError);

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });

    } catch (e) {
        logEvent.on('error', e);

        process.exit(1);
    }
}

main();