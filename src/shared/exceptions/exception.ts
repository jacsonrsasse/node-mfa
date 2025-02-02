export interface IException {
  statusCode: number;
  message: string;
}

export class Exception extends Error implements IException {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = new.target?.name || 'Error';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, new.target);
  }
}
