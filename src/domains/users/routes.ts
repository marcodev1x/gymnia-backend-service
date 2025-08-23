import { Router } from 'express';
import { createUser } from './controller';
import { validateBodyRequest } from '~/middlewares/joi';
import { createUserSchema } from './schemas';

export const usersRoutes =  Router();

// Routes
usersRoutes.post('/create-user', validateBodyRequest(createUserSchema), createUser);
