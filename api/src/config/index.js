import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../../.env` });

const config = {
  port: parseInt(process.env.API_PORT, 10) || 3000,
  knex: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname, '../db/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/seeds'),
    },
  },
};

export default config;
