process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  port: 5000,
  api: {
    prefix: '/api',
  },
  corsOptions: {
    method: ['GET', 'HEAD', 'PATCH', 'PUT', 'POST', 'DELETE'],
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  },
  jwt: {
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    secret: process.env.JWT_SECRET || '',
    expire: {
      access: parseFloat(process.env.JWT_EXPIRE_ACCESS || '0'),
      refresh: parseFloat(process.env.JWT_EXPIRE_REFRESH || '0'),
    },
  },
};
