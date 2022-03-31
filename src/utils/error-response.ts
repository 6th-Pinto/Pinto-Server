interface ErrorResponseProps {
  statusCode: number;
  message: string;
  timeStamp: string;
}

class ErrorResponse extends Error {
  isOperational: boolean;

  statusCode: number;

  timeStamp: string;

  stacks?: string;

  constructor({ message, statusCode, timeStamp }: ErrorResponseProps) {
    super(message);
    this.statusCode = statusCode;
    this.timeStamp = timeStamp;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

    this.stacks = this.stack;
  }
}

export default ErrorResponse;
