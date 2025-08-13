import app from '~/app';
import { appConfig } from '~/config/app.config';
import { isDevelopment } from '~/global';
import 'module-alias/register';

app.listen(
  appConfig.port, () => {
    if (isDevelopment) console.log(`Server running on port ${appConfig.port}`);
  },
);
