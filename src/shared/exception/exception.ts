export const Exception = (exceptionName: string) => {
  return class extends Error {
    readonly statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.name = exceptionName;
      this.statusCode = statusCode;

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, new.target);
      }
    }
  };
};
