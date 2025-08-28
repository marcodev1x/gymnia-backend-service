import axios from 'axios';
import { appConfig } from '~/config/app.config';
import { UseAiParams, UseAiResponse } from '~/types/UseAi';

export async function useAi({
    url = appConfig.zaiApiUrl!,
    model = appConfig.zaiApiModel!,
    thinking = { type: 'disabled' },
    systemContent,
    userContent,
    headers,
    retries = 3,
    delay = 1000,
}: UseAiParams,
): Promise<UseAiResponse | undefined> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const request = await axios.post<UseAiResponse>(
                url,
                {
                    model,
                    thinking,
                    messages: [
                        { role: 'system', content: systemContent },
                        { role: 'user', content: userContent },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${appConfig.zaiApiKey}`,
                        ...headers,
                    },
                },
            );

            const data = request.data;

            if (data?.choices?.[0]?.message?.content) {
                return data;
            }

            console.warn(`Resposta inválida na tentativa ${attempt}.`);

        } catch (error) {
            console.warn(`Erro na tentativa ${attempt}:`, error);
        }

        if (attempt < retries) {
            await new Promise(res => setTimeout(res, delay * attempt)); // Backoff exponencial
        }
    }

    console.error('Falha após todas as tentativas.');
    return undefined;
}
