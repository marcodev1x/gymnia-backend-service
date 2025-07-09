import app from '~/app';
import { appConfig } from './config/app.config';

app.listen(
    appConfig.port, () => null
);
