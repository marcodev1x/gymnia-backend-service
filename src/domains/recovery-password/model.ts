import { Model } from 'objection';
import { add } from 'date-fns';

export class RecoveryPassword extends Model {
    static get tableName() {
        return 'recovery_password_requests';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    user_id: number;
    token: string;
    used: boolean;
    created_at: Date;
    expires_at: Date;

    $beforeInsert() {
        this.created_at = new Date();
        this.expires_at = add(this.created_at, { hours: 2 });
    }

}
