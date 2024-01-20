import { ref } from 'vue';
import { ValidationError } from 'yup';

export function useValidation({ schema }) {
  const errors = ref({});

  function hasError(path) {
    return errors.value.hasOwnProperty(path);
  }
  function resetError() {
    errors.value = {};
  }
  async function validate(values) {
    try {
      resetError();

      return await schema.validate(values);
    } catch (err) {
      if (err instanceof ValidationError) {
        errors.value = {
          [err.path]: err.errors[0],
        };
      }
      throw err;
    }
  }

  return {
    errors,
    hasError,
    resetError,
    validate,
  };
}
