export default {
  port: process.env.APP_PORT || 8080,
  mongo: {
    uri: process.env.APP_DATABASE_URL,
    options: {},
  },
};
