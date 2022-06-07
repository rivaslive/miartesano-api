export default {
  port: process.env.APP_PORT || 8080,
  saltRounds: Number(process.env.APP_SALT_ROUNDS ?? 10),
  jwtKey: process.env.APP_JWT_SECRET || 'secret',
  mongo: {
    uri: process.env.APP_DATABASE_URL,
    options: {},
  },
};
