import { ConfigParamsRepository } from '~/domains/config-params/repository';
import { GymniaConfigParams, ConfigParamsEnum } from '~/domains/config-params/model';
import { SendHttpError } from '~/generic-errors';

export class ConfigParamsService {
    constructor(private configParamsRepository: ConfigParamsRepository) {}

    async getConfigParams(): Promise<GymniaConfigParams[]> {
        return await this.configParamsRepository.getConfigParams();
    }

    async getSpecificConfigParam(param: ConfigParamsEnum): Promise<GymniaConfigParams> {
        const configParam = await this.configParamsRepository.getSpecificConfigParam(param);

        if (!configParam) {
            throw SendHttpError({ element: 'Config param', error: 'NOT_FOUND' });
        }

        return configParam;
    }
}
