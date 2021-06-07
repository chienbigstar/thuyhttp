import dotenv from 'dotenv';

dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST || 'mysql',
  DB_PORT: parseInt(process.env.DB_PORT) || 3306,
  DB_ROOT_PASS: process.env.DB_ROOT_PASS || 'rootpass',
  DB_USER: process.env.DB_USER || 'books',
  DB_PASS: process.env.DB_PASS || 'books',
  DB_DATABASE: process.env.DB_DATABASE || 'books',
};
