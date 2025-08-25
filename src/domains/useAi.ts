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
}: UseAiParams): Promise<UseAiResponse | undefined> {
  try {
    const request = await axios.post(url, {
      model,
      thinking,
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: userContent },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appConfig.zaiApiKey}`,
        ...headers,
      },
    });

    return request.data;
  } catch (e) {
    console.warn(e);
    return;
  }
}
