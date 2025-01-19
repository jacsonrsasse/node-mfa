import { PresentationException } from './presentation.exception';

export class InvalidInputException extends PresentationException(
  'InvalidInputException',
) {
  constructor(requiredField: string) {
    super(`Missing required field: ${requiredField}`);
  }
}
