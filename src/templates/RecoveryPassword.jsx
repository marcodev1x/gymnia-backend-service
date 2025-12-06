import { Html, Body, Container, Text } from '@react-email/components';

import * as React from 'react';
import { appConfig } from '~/config/app.config';

function RecoveryPasswordEmail({ name, code }) {
    return (
        <Html>
            <Body style={{ backgroundColor: '#f6f6f6' }}>
                <Container style={{ background: '#fff', padding: '24px' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
							Olá {name}! Recebemos uma solicitação de recuperação de senha.
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#555' }}>
						Acesse este link para iniciar o processo de recuperação de senha:
                        <br/>
                        <a href={`${appConfig.principalFrontUrl}/recuperar-senha/${code}`}>
                            Link para recuperar senha
                        </a>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

export default RecoveryPasswordEmail;
