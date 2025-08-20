import dotenv from 'dotenv';

dotenv.config();

const {
  DEFAULT_PORT,
  LOCAL,
  ZAI_API_KEY,
} = process.env;

export const appConfig = {
  local: LOCAL,
  port: DEFAULT_PORT,
  zaiApiKey: ZAI_API_KEY,
};
