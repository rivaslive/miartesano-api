import path from 'path';

const env = process.env.NODE_ENV;
const serverUrl = process.env.APP_SERVER_URL ?? 'http://localhost:8080';
const publicPath = path.join(__dirname, '../../public');
const uploadPath = path.join(publicPath, 'uploads')

export default {
  env,
  publicPath,
  uploadPath,
  serverUrl,
  isProd: env === 'production',
  port: process.env.PORT || 8080,
  saltRounds: Number(process.env.APP_SALT_ROUNDS ?? 10),
  jwtKey: process.env.APP_JWT_SECRET || 'secret',
  mongo: {
    uri: process.env.APP_DATABASE_URL,
    options: {},
  },
};
