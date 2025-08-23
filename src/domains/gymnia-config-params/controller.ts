import { GymniaConfigParamsImplementation } from './repository';
import { GymniaConfigParamsService } from './services';
import { Request, Response, NextFunction } from 'express';

const gymniaConfigParamsRepository = new GymniaConfigParamsImplementation();
export const gymniaConfigParamsService = new GymniaConfigParamsService(gymniaConfigParamsRepository);

// TODO: Remover, apenas teste.
export async function getConfigList(_req: Request, res: Response, next: NextFunction) {
  try {
    const configList = await gymniaConfigParamsService.getConfigParams();

    res.status(200).json(configList);
  } catch (e) {
    next(e);
  }
}
