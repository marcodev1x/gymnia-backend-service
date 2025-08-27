import { GymniaConfigParamsRepository } from '~/domains/gymnia-config-params/repository';
import { GymniaConfigParams, GymniaConfigParamsEnum } from '~/domains/gymnia-config-params/model';
import { ThrowHttpError } from '~/generic-errors';

export class GymniaConfigParamsService {
    constructor(private gymniaConfigParamsRepository: GymniaConfigParamsRepository) {}

    async getConfigParams(): Promise<GymniaConfigParams[]> {
        return await this.gymniaConfigParamsRepository.getConfigParams();
    }

<<<<<<< HEAD
    async getSpecificConfigParam(param: GymniaConfigParamsEnum): Promise<GymniaConfigParams> {
        const configParam = await this.gymniaConfigParamsRepository.getSpecificConfigParam(param);

        if (!configParam) {
            throw ThrowHttpError({ element: 'ConfigParam', error: 'NOT_FOUND' });
        }

        return configParam;
    }
=======
  async getSpecificConfigParam(param: GymniaConfigParamsEnum): Promise<GymniaConfigParams> {
    const configParam = await this.gymniaConfigParamsRepository.getSpecificConfigParam(param);

    if (!configParam) {
      throw ThrowHttpError({ element: 'ConfigParam', error: 'NOT_FOUND' });
    }

    return configParam;
  }
>>>>>>> 9b6933fc3715e65ee699f096c9ad92d2dac2a4d0
}
