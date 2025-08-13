export interface IError {
  errorCode: number;
  message: string;
}

export class AppError extends Error {
  code: number;
  errorCode: number;
  constructor(code: number, error: IError) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code || 500;
    this.errorCode = error?.errorCode || 500;
    this.message = error?.message || 'Something wrong. Please try again.';
  }
}

export class MissingUUID extends Error {
  code: number;
  constructor(message, code) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'UUID is required!';
    this.code = code || 500;
  }
}
