import express, { Request, Response }  from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '~/routes';
import '~/knex';
import { errorMiddlewareSent } from './middlewares/errors';
import swaggerUi from 'swagger-ui-express';
import { isDevelopment } from './global';
import yaml from 'yamljs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use(routes);

// Swagger
const yml = yaml.load(`swagger.yml`);
if (isDevelopment) app.use('/docs', swaggerUi.serve, swaggerUi.setup(yml));

app.use((_request: Request, response: Response) => {
    response.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: 'Rota não encontrada',
        },
    });
});

app.use(errorMiddlewareSent);

export default app;
