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

export interface EssayJsonResult {
    verificacao_inicial: {
        casos_eliminatorios: boolean,
        observacao: string,
    },
    pontos_a_melhorar: [
        {
            trecho: string,
            problema: string,
            sugestao: string,
        }
    ],
    avaliacao: [
        {
            competencia: string,
            nota: number,
            nivel: string,
            justificativa: string,
        },
        {
            competencia: string,
            nota: number,
            nivel: string,
            justificativa: string,
        },
        {
            competencia: string,
            nota: number,
            nivel: string,
            justificativa: string,
        },
        {
            competencia: string,
            nota: number,
            nivel: string,
            justificativa: string,
        },
        {
            competencia: string,
            nota: number,
            nivel: string,
            justificativa: string,
        }
    ],
    resultado_final: {
        nota_total: number,
        classificacao: string,
    },
    feedback: {
        pontos_fortes: Array<string>,
        principais_deficiencias: Array<string>,
        prioridade_estudos: string,
    }
}

export interface UseAiResponse<T> {
 choices: {
     finish_reason: string;
     index: number;
     message: {
         content: T;
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
