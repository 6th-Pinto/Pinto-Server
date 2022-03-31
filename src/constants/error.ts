export const commonError = {
  notFound: {
    statusCode: 404,
    message: 'Not Found',
    timeStamp: new Date().toISOString(),
  },
  forbidden: {
    statusCode: 403,
    message: 'Forbidden',
    timeStamp: new Date().toISOString(),
  },
  conflict: {
    statusCode: 409,
    message: 'already exist',
    timeStamp: new Date().toISOString(),
  },
  wrong: {
    statusCode: 500,
    message: 'Something went very wrong!!!',
    timeStamp: new Date().toISOString(),
  },
  unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
    timeStamp: new Date().toISOString(),
  },
  badRequest: {
    statusCode: 400,
    message: 'Bad Request',
    timeStamp: new Date().toISOString(),
  },
  unexpectedField: {
    statusCode: 400,
    message: 'Unexpected field',
    timeStamp: new Date().toISOString(),
  },
  invalidQuery: {
    statusCode: 400,
    message: 'Invalid query parameters',
    timeStamp: new Date().toISOString(),
  },
  invalidPathParams: {
    statusCode: 400,
    message: 'Invalid path parameters',
    timeStamp: new Date().toISOString(),
  },
  invalidState: {
    statusCode: 422,
    message: 'Invalid state',
    timeStamp: new Date().toISOString(),
  },
};
