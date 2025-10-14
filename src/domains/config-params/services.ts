import { ConfigParamsRepository } from '~/domains/config-params/repository';
import { EssayConfigParams, EssayConfigParamsEnum } from '~/domains/config-params/model';
import { DefaultHttpError } from '~/generic-errors';

export class ConfigParamsService {
    constructor(private configParamsRepository: ConfigParamsRepository) {}

    async getConfigParams(): Promise<EssayConfigParams[]> {
        return await this.configParamsRepository.getConfigParams();
    }

    async getSpecificConfigParam(param: EssayConfigParamsEnum): Promise<EssayConfigParams> {
        const configParam = await this.configParamsRepository.getSpecificConfigParam(param);

        if (!configParam) {
            throw DefaultHttpError({ element: 'Config param', error: 'NOT_FOUND' });
        }

        return configParam;
    }
}
