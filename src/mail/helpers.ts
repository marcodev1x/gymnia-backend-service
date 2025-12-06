import { render } from '@react-email/render';
import React from 'react';
import { Mailer } from '~/mail/mailer';

const mailer = new Mailer();

export async function createAndSendHtmlRendered({
    html,
    props,
    to,
    subject,
}) {
    const htmlFinal = await render(React.createElement(html, props));

    await mailer.sendEmail(to, subject, htmlFinal);

    return;
}
