import { Model } from 'objection';

export class GymniaConfigParams extends Model {
  static get tableName() {
    return 'gymnia_config_params';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  nome_parametro: string;
  valor_parametro: string;
};
