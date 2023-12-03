import { ref } from 'vue';
import { useValidation } from './validation.compose';

export function useForm({ schema, validationSchema }) {
  const { errors, hasError, resetError, validate } = useValidation({
    schema: validationSchema,
  });

  const form = ref({
    ...schema,
  });

  function resetForm() {
    form.value = { ...schema };
  }

  async function submit() {
    try {
      resetError();

      await validate(form.value);
    } catch (err) {
      //
    }
  }

  return {
    form,
    errors,
    resetForm,
    hasError,
    resetError,
    submit,
  };
}
