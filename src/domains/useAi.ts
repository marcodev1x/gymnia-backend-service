import axios from 'axios';
import { appConfig } from '~/config/app.config';

interface UseAiParams {
    url?: string;
    model?: string;
    thinking?: {
        type: 'disabled' | 'enabled';
    };
    systemContent: string;
    userContent: string;
    headers?: Record<string, string>;
    retries?: number;
    delay?: number; // ms
}

export interface UseAiResponse {
    choices: {
        finish_reason: string;
        index: number;
        message: {
            content: string;
            role: string;
        };
    }[];
    created: number;
    id: string;
    model: string;
    request_id: string;
    usage: {
        completion_tokens: number;
        prompt_tokens: number;
        prompt_tokens_details: {
            cached_tokens: number;
        };
        total_tokens: number;
    };
}

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
