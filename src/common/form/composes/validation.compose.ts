import { FormInst, useMessage } from 'naive-ui';

export function useValidation() {
  const message = useMessage();

  function validate(form: FormInst): Promise<boolean> {
    return new Promise((resolve, reject) => {
      form.validate((errors) => {
        if (errors) {
          message.error('Please fill out the form');

          return reject(errors);
        }

        return resolve(true);
      });
    });
  }

  return { validate };
}
