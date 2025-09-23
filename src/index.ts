import './setup';
import app from '~/app';
import { appConfig } from '~/config/app.config';
import { isDevelopment } from '~/global';
import 'module-alias/register';
import logger from './logger';

app.listen(
    appConfig.port, () => {
        if (isDevelopment) {
            const developmentMessages = [
                { message: `Server running in ${appConfig.port} port` },
                { message: `Environment: ${appConfig.local}` },
                { message: `Process ID: ${process.pid}` },
            ];

            developmentMessages.map(logging => logger.info(logging.message));
        } else {
            return;
        }
    },
);
