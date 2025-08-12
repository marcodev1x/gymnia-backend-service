import { appConfig } from '~/config/app.config';

export const isDevelopment = appConfig.local === 'development';
