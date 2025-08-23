import { GymniaUserImplementation } from './repository';
import { GymniaUserService } from './services';
import { Request, Response, NextFunction } from 'express';

const repository = new GymniaUserImplementation();
const service = new GymniaUserService(repository);

export async function createUser(request: Request, response: Response, next: NextFunction) {
  try {
    const { user } = request.body;

    const userCreated = await service.createUser(user);

    response.status(201).json(userCreated);
  } catch (e) {
    next(e);
  }
}
