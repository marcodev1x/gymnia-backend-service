import { GymniaConfigParamsRepository } from '~/domains/gymnia-config-params/repository';
import { GymniaConfigParams, GymniaConfigParamsEnum } from '~/domains/gymnia-config-params/model';

export class GymniaConfigParamsService {
  constructor(private gymniaConfigParamsRepository: GymniaConfigParamsRepository) {}

  async getConfigParams(): Promise<GymniaConfigParams[]> {
    return await this.gymniaConfigParamsRepository.getConfigParams();
  }

  async getSpecificConfigParam(param: GymniaConfigParamsEnum): Promise<GymniaConfigParams | undefined> {
    return await this.gymniaConfigParamsRepository.getSpecificConfigParam(param);
  }
}
