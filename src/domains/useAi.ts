import { appConfig } from '~/config/app.config';
import logger from '~/logger';
import { UseAiParams } from '~/types/UseAi';
import { OpenAI } from 'openai';
import { safeJsonParse } from '~/domains/essay-user-try/helpers';

type ExtraOpenRouterCfgs = {
    models: string[];
}

const openAI = new OpenAI({
    baseURL: appConfig.aiApiUrl?.replace(/\/chat\/completions$/, ''),
    apiKey: appConfig.aiApiKey!,
    timeout: 15000,
    defaultHeaders: {
        'X-Title': 'Pazzei IA',
        'HTTP-Referer': appConfig.aiDefaultTrackingUrl!,
    },
});

export async function useAi<T>({
    model = appConfig.aiApiModel!,
    substituteModels,
    systemContent,
    userContent,
    jsonFormat,
    retries = 3,
    delay = 1000,
}: UseAiParams): Promise<T | undefined> {
    if (!userContent && !systemContent) {
        logger.error('Nenhum conteúdo enviado para IA.');
        return undefined;
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
    if (systemContent) messages.push({ role: 'system', content: systemContent });
    if (userContent) messages.push({ role: 'user', content: userContent });

    const extraOpenRouterCfgs: ExtraOpenRouterCfgs = {
        models: substituteModels || [],
    };

    const body: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming & ExtraOpenRouterCfgs = {
        model,
        n: 1,
        messages,
        response_format: jsonFormat ? { type: 'json_object' } : undefined,
        temperature: 0.7,
        max_completion_tokens: 2048,
        ...extraOpenRouterCfgs,
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const { choices } = await openAI.chat.completions.create(body);

            const content = choices[0]?.message?.content;
            if (!content) {
                logger.warn(`Resposta vazia da IA (tentativa ${attempt}).`);
            } else {
                return jsonFormat ? safeJsonParse(content) as T : (content as T);
            }

        } catch (error: any) {
            logger.warn(
                `Erro na tentativa ${attempt}: ${error.status || ''} ${error.message || error}`,
            );
        }

        if (attempt < retries) {
            const backoff = delay * attempt;
            logger.info(`Repetindo em ${backoff}ms (tentativa ${attempt + 1})...`);
            await new Promise((res) => setTimeout(res, backoff));
        }
    }

    logger.error('Falha após todas as tentativas de chamada à IA.');
    return undefined;
}
