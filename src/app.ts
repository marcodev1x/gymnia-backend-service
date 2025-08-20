import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '~/routes';
import '~/knex';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use(routes);

export default app;
