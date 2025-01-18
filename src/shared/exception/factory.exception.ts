interface CustomException {
  level: 'domain' | 'application' | 'infra' | 'presentation';
}

export const FactoryException = (
  exceptionName: string,
  exceptionLevel: 'domain' | 'application' | 'infra' | 'presentation',
) => {
  return class extends Error implements CustomException {
    level = exceptionLevel;

    constructor(message: string) {
      super(message);
      this.name = exceptionName;

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, new.target);
      }
    }
  };
};
