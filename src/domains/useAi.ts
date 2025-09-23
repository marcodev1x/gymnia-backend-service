import { appConfig } from '~/config/app.config';
import logger from '~/logger';
import { UseAiParams, UseAiResponse } from '~/types/UseAi';
import { OpenAI } from 'openai';
import axios from 'axios';
import { safeJsonParse } from '~/domains/gymnia-essay-user-try/helpers';

export async function useAi({
    model = appConfig.zaiApiModel!,
    systemContent,
    thinking = { type: 'disabled' },
    userContent,
    jsonFormat,
    retries = 3,
    delay = 1000,
}: UseAiParams,
): Promise<UseAiResponse | undefined> {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appConfig.zaiApiKey!}`,
    };

    const body = {
        model,
        messages: [
            systemContent ? { role: 'system', content: systemContent } : undefined,
            userContent ? { role: 'user', content: userContent } : undefined,
        ].filter(Boolean),
        thinking,
    } as OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

    if (jsonFormat) {
        body.response_format = { type: 'json_object' };
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const request = await axios.post<UseAiResponse>(
                appConfig.zaiApiUrl!,
                body,
                { headers },
            );

            if (request.data.choices?.[0]?.message.content) {
                return safeJsonParse(request.data.choices[0].message.content);
            }

            logger.warn(`Resposta inválida na tentativa ${attempt}.`);

        } catch (error) {
            logger.warn(`Erro na tentativa ${attempt}:`, error);
        }

        if (attempt < retries) {
            await new Promise(res => setTimeout(res, delay * attempt)); // Backoff exponencial
        }
    }

    logger.error('Falha após todas as tentativas.');
    return undefined;
}
