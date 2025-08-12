import { Model } from 'objection';

export class Test extends Model {
  static get tableName() {
    return 'test';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  nome: string;
  email: string;
  idade: number;
  criado_em: Date;
}
