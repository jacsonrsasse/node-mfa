import { FactoryException } from '@shared/exception/factory.exception';

export const PresentationException = (exceptionName: string) =>
  FactoryException(exceptionName, 'presentation');
