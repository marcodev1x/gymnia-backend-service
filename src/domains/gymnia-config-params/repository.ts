import { GymniaConfigParams } from '~/domains/gymnia-config-params/model';

export interface GymniaConfigParamsRepository {
    getConfigParams(): Promise<GymniaConfigParams[]>;
};

export class GymniaConfigParamsImplementation implements GymniaConfigParamsRepository {
  async getConfigParams(): Promise<GymniaConfigParams[]> {
    return await GymniaConfigParams.query().select(['nome_parametro', 'valor_parametro']);
  }
}
