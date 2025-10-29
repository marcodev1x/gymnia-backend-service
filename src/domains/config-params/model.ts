import { Model } from 'objection';

export enum EssayConfigParamsEnum {
    REDACAO = 'validate_essay',
    DIARY_ESSAY_LIMIT = 'diary_essay_limit',
}

export class EssayConfigParams extends Model {
    static get tableName() {
        return 'essay_config_params';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    nome_parametro: string;
    valor_parametro: string;
}
