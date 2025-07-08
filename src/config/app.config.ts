import dotenv from 'dotenv';

dotenv.config();

const { DEFAULT_PORT } = process.env;

export const appConfig = {
  port: DEFAULT_PORT,
};