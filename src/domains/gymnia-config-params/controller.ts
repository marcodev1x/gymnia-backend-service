import { GymniaConfigParamsImplementation } from './repository';
import { GymniaConfigParamsService } from './services';
/*import { Request, Response, NextFunction } from 'express';*/ // Removido pois no momento é useless

const gymniaConfigParamsRepository = new GymniaConfigParamsImplementation();
export const gymniaConfigParamsService = new GymniaConfigParamsService(gymniaConfigParamsRepository);

/*
export async function getConfigList(_request: Request, response: Response, next: NextFunction) {
    try {
        const configList = await gymniaConfigParamsService.getConfigParams();

        response.json(configList);
    } catch (e) {
        next(e);
    }
}
*/
