import nodemailer from 'nodemailer';
import { mailerConfig } from '~/config/mailer.config';

export class Mailer {
    transpoter() {
        return nodemailer.createTransport({
            host: mailerConfig.host,
            port: mailerConfig.port,
            secure: mailerConfig.secure,
            auth: mailerConfig.auth,
        });
    };

    async sendEmail(to: string, subject: string, html: Element) {
        const mailOptions = {
            from: mailerConfig.from,
            to,
            subject,
            html,
        };

        await this.transpoter().sendMail(mailOptions);
    }
}
