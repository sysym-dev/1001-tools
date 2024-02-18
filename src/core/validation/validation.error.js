import { ValidationError as YupValidationError } from 'yup';

export class ValidationError {
  details;

  constructor(error) {
    if (error instanceof YupValidationError) {
      this.details = Object.fromEntries(
        error.inner.map((item) => {
          return [item.path, item.errors[0]];
        }),
      );
    } else {
      this.details = {};
    }
  }
}
