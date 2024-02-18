import { ValidationError as YupValidationError } from 'yup';

export class ValidationError {
  details;

  constructor(error) {
    if (error instanceof YupValidationError) {
      this.details = Object.fromEntries(
        error.errors.map((item) => {
          return [item.path, item.errors];
        }),
      );
    } else {
      this.details = {};
    }
  }
}
