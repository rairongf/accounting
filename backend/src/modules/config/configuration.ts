export const getConfiguration = () => ({
  app,
  database,
  jwt,
});

const app = {
  url: process.env.APP_URL || 'http://localhost',
  port: parseInt(process.env.PORT ?? '8082', 10) || 8082,
  nodeEnv: process.env.NODE_ENV || 'development',
};

const database = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'user',
  password: process.env.DATABASE_PASSWORD || 'pass',
  database: process.env.DATABASE_NAME || 'data',
  url: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/data',
};

const jwt = {
  secret: process.env.JWT_SECRET || 'secret',
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '604800',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '2629800',
};
