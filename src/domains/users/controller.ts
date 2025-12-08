import { UserImplementation } from './repository';
import { UserService } from './services';
import { Request, Response, NextFunction } from 'express';
import { essayResultsService } from '~/domains/essay-results/controller';

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

export async function loginWithGoogle(request: Request, response: Response, next: NextFunction) {
    try {
        const { id_token } = request.body;

        const login = await userService.loginWithGoogle(id_token);

        response.json(login);
    } catch (e) {
        next(e);
    }
}

export async function getUserInfo(request: Request, response: Response, next: NextFunction) {
    try {
        const { user } = request;

        const getUserNoSensitiveData = await userService.findByEmail(user!.email, false);
        const avgScore = await essayResultsService.getUserAverageScore(getUserNoSensitiveData?.id);

        response.json({
            ...getUserNoSensitiveData,
            averageScore: avgScore,
        });
    } catch (e) {
        next(e);
    }
}
