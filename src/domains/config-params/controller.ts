import { ConfigParamsImplementation } from './repository';
import { ConfigParamsService } from './services';
import { Request, Response, NextFunction } from 'express';

const configParamsRepository = new ConfigParamsImplementation();
export const configParamsService = new ConfigParamsService(configParamsRepository);

export async function getConfigList(_request: Request, response: Response, next: NextFunction) {
    try {
        const configList = await configParamsService.getConfigParams();

        response.json(configList);
    } catch (e) {
        next(e);
    }
}
