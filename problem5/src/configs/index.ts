import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
const configs = {
  server: {
    port: process.env.APP_PORT || 3000,
    app_name: process.env.APP_NAME || 'app',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USERNAME || 'tandat',
    password: process.env.DB_PASSWORD || '12345678',
    database: process.env.DB_DATABASE || 'houzez_dev',
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
  },
};

export default configs;
