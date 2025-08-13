import dotenv from 'dotenv';

dotenv.config();

const {
  DEFAULT_PORT,
  LOCAL,
} = process.env;

export const appConfig = {
  local: LOCAL,
  port: DEFAULT_PORT,
};
