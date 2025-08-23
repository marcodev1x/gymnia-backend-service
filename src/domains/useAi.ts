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

export async function useAi({
  url = appConfig.zaiApiUrl!,
  model = appConfig.zaiApiModel!,
  thinking = { type: 'disabled' },
  systemContent,
  userContent,
  headers,
}: UseAiParams) {
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
}
