import { Model } from 'objection';

export class GymniaUser extends Model {
  static get tableName() {
    return 'gymnia_users';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  name: string;
  email: string;
  secret: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $hiddenFields() {
    return ['id', 'secret', 'created_at', 'updated_at', 'deleted_at'];
  }
}
