import { GymniaConfigParamsImplementation } from './repository';
import { GymniaConfigParamsService } from './services';
import { Request, Response } from 'express';

const repository = new GymniaConfigParamsImplementation();
const service = new GymniaConfigParamsService(repository);

// TODO: Remover, apenas teste.
export async function getConfigList(_req: Request, res: Response) {
  try {
    const configList = await service.getConfigParams();

    res.status(200).json(configList);
  } catch (e) {
    console.info(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
