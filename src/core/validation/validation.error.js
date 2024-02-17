import yup from 'yup';

export class ValidationError {
  details;

  constructor(error) {
    if (error instanceof yup.ValidationError) {
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
