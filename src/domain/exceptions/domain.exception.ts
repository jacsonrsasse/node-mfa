import { FactoryException } from '@shared/index';

export const DomainException = (exceptionName: string) =>
  FactoryException(exceptionName, 'domain');
