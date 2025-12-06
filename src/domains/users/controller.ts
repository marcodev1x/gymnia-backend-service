import { UserImplementation } from './repository';
import { UserService } from './services';
import { Request, Response, NextFunction } from 'express';

const repository = new UserImplementation();
export const userService = new UserService(repository);

export async function createUser(request: Request, response: Response, next: NextFunction) {
    try {
        const { user } = request.body;

        const userCreated = await userService.createUser(user);

        response.status(201).json(userCreated);
    } catch (e) {
        next(e);
    }
}

export async function loginUser(request: Request, response: Response, next: NextFunction) {
    try {
        const { email, password } = request.body;

        const login = await userService.loginUser(email, password);

        response.json(login);
    } catch (e) {
        next(e);
    }
}
