import { GymniaConfigParams, GymniaConfigParamsEnum } from '~/domains/gymnia-config-params/model';

export interface GymniaConfigParamsRepository {
    getConfigParams(): Promise<GymniaConfigParams[]>;
    getSpecificConfigParam(param: GymniaConfigParamsEnum): Promise<GymniaConfigParams | undefined>;
};

export class GymniaConfigParamsImplementation implements GymniaConfigParamsRepository {
  async getConfigParams(): Promise<GymniaConfigParams[]> {
    return await GymniaConfigParams
      .query()
      .select(['nome_parametro', 'valor_parametro']);
  }

  async getSpecificConfigParam(param: GymniaConfigParamsEnum): Promise<GymniaConfigParams | undefined> {
    return await GymniaConfigParams
      .query()
      .select(['nome_parametro', 'valor_parametro'])
      .where('nome_parametro', param)
      .first();
  }
}
