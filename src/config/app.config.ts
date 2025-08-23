import dotenv from 'dotenv';

dotenv.config();

const {
  DEFAULT_PORT,
  LOCAL,
  ZAI_API_KEY,
  ZAI_API_URL,
  ZAI_API_MODEL,
} = process.env;

export const appConfig = {
  local: LOCAL,
  port: DEFAULT_PORT,
  zaiApiKey: ZAI_API_KEY,
  zaiApiUrl: ZAI_API_URL,
  zaiApiModel: ZAI_API_MODEL,
};
