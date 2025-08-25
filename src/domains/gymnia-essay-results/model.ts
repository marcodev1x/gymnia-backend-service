import { Model } from 'objection';

export class GymniaEssayResults extends Model {
  static get tableName() {
    return 'gymnia_essay_results';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  essay_try_id: number;
  score: number;
  ia_result: JSON;
  created_at: Date;
  updated_at: Date;

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
