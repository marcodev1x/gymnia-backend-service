import { GymniaConfigParams, ConfigParamsEnum } from '~/domains/config-params/model';

export interface ConfigParamsRepository {
    getConfigParams(): Promise<GymniaConfigParams[]>;
    getSpecificConfigParam(param: ConfigParamsEnum): Promise<GymniaConfigParams | undefined>;
}

export class ConfigParamsImplementation implements ConfigParamsRepository {
    async getConfigParams(): Promise<GymniaConfigParams[]> {
        return GymniaConfigParams
            .query()
            .select(['nome_parametro', 'valor_parametro']);
    }

    async getSpecificConfigParam(param: ConfigParamsEnum): Promise<GymniaConfigParams | undefined> {
        return GymniaConfigParams
            .query()
            .select(['nome_parametro', 'valor_parametro'])
            .where('nome_parametro', param)
            .first();
    }
}
