import { Model } from 'objection';

export class GymniaEssayThemes extends Model {
  static get tableName() {
    return 'gymnia_essay_themes';
  }

  static get idColumn() {
    return 'id';
  }

  id: number;
  theme_title: string;
  theme_description: string;
  is_active: boolean;
  limit_lines: number;
  difficulty_level: string;
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
