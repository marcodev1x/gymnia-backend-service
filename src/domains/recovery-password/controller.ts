import { RecoveryPasswordImplementation } from './repository';
import { RecoveryPasswordService } from './services';
import { Request, Response, NextFunction } from 'express';
import { userService } from '~/domains/users/controller';

import { createAndSendHtmlRendered } from '~/mail/helpers';
import RecoveryPasswordEmail from '~/templates/RecoveryPassword';

const repository = new RecoveryPasswordImplementation();
export const recoveryPasswordService = new RecoveryPasswordService(repository);

export async function createRecoveryTry(request: Request, response: Response, next: NextFunction) {
    try {
        response.status(200).json();

        const { email } = request.body;

        const user = await userService.findByEmail(email, true);

        if (!user) {
            return;
        }

        const createdTry = await recoveryPasswordService.createRecoveryTry(user?.id);

        await createAndSendHtmlRendered({
            html: RecoveryPasswordEmail,
            props: { name: user?.name, code: createdTry?.token },
            to: user.email,
            subject: 'Tema Certo - Recuperação de senha',
        });
    } catch (e) {
        next(e);
    }
}
