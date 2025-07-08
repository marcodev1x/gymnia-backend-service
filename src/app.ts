import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '~/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Routes
app.use(routes);

export default app;
