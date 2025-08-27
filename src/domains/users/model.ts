import { Model } from 'objection';
import bcrypt from 'bcrypt';
import { appConfig } from '~/config/app.config';

export enum GymniaUserRoles {
    ADMIN = 'gymnia:adm',
    USER = 'gymnia:user',
    TRIAL = 'gymnia:trial'
}

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
    user_role: GymniaUserRoles;

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();

        if (!this.user_role) {
            this.user_role = GymniaUserRoles.TRIAL;
        }
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    $hiddenFields() {
        return ['id', 'secret', 'created_at', 'updated_at', 'deleted_at', 'user_role'];
    }

    static async hashSecret(secret: string) {
        return await bcrypt.hash(secret, appConfig.bcryptHashQuantity);
    }

    static async confirmSecret(secret: string, hashedSecret: string) {
        return await bcrypt.compare(secret, hashedSecret);
    }
}
