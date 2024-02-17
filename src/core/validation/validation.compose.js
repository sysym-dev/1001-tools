import { ValidationError } from './validation.error';

export function useValidation(schema) {
  async function validate(values) {
    try {
      const res = await schema.validate(values);

      return res;
    } catch (err) {
      throw new ValidationError(err);
    }
  }

  return {
    validate,
  };
}
