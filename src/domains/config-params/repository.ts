import { EssayConfigParams, EssayConfigParamsEnum } from '~/domains/config-params/model';

export interface ConfigParamsRepository {
    getConfigParams(): Promise<EssayConfigParams[]>;
    getSpecificConfigParam(param: EssayConfigParamsEnum): Promise<EssayConfigParams | undefined>;
}

export class ConfigParamsImplementation implements ConfigParamsRepository {
    async getConfigParams(): Promise<EssayConfigParams[]> {
        return EssayConfigParams
            .query()
            .select(['nome_parametro', 'valor_parametro']);
    }

    async getSpecificConfigParam(param: EssayConfigParamsEnum): Promise<EssayConfigParams | undefined> {
        return EssayConfigParams
            .query()
            .select(['nome_parametro', 'valor_parametro'])
            .where('nome_parametro', param)
            .first();
    }
}
