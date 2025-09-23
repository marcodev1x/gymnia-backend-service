export interface UseAiParams {
 url?: string;
 model?: string;
 systemContent: string;
 thinking?: {
     type: 'disabled' | 'enabled';
 };
 jsonFormat: boolean;
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
