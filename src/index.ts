import './setup';
import app from '~/app';
import { appConfig } from '~/config/app.config';
import { isDevelopment } from '~/global';
import 'module-alias/register';
import logger from './logger';

app.listen(
    appConfig.port, () => {
        if (isDevelopment) logger.info(`Server running on port ${appConfig.port}`);
    },
);
