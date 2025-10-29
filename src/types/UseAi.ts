export interface UseAiParams {
 url?: string;
 model?: string;
 substituteModels?: string[];
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
    initial_check: {
        eliminatory_cases: boolean,
        observation: string,
    },
    points_to_improve: [
        {
            excerpt: string,
            problem: string,
            suggestion: string,
        }
    ],
    evaluation: [
        {
            competence: string,
            score: number,
            level: string,
            justification: string,
        },
        {
            competence: string,
            score: number,
            level: string,
            justification: string,
        },
        {
            competence: string,
            score: number,
            level: string,
            justification: string,
        },
        {
            competence: string,
            score: number,
            level: string,
            justification: string,
        },
        {
            competence: string,
            score: number,
            level: string,
            justification: string,
        }
    ],
    final_result: {
        total_score: number,
        classification: string,
    },
    feedback: {
        strengths: Array<string>,
        main_deficiencies: Array<string>,
        study_priority: string,
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
