import { GymniaConfigParamsRepository } from '~/domains/gymnia-config-params/repository';
import { GymniaConfigParams, GymniaConfigParamsEnum } from '~/domains/gymnia-config-params/model';
import { ThrowHttpError } from '~/generic-errors';

export class GymniaConfigParamsService {
  constructor(private gymniaConfigParamsRepository: GymniaConfigParamsRepository) {}

  async getConfigParams(): Promise<GymniaConfigParams[]> {
    return await this.gymniaConfigParamsRepository.getConfigParams();
  }

  async getSpecificConfigParam(param: GymniaConfigParamsEnum): Promise<GymniaConfigParams> {
    const configParam = await this.gymniaConfigParamsRepository.getSpecificConfigParam(param);

    if (!configParam) {
      throw ThrowHttpError({ element: 'ConfigParam', error: 'NOT_FOUND' });
    }

    return configParam;
  }
}
