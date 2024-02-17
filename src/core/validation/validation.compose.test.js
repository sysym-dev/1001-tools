import { describe, expect, test, vi } from 'vitest';
import { useValidationCompose } from './validation.compose';
import { ValidationError } from './validation.error';

vi.mock('./validation.error');

describe('validation.compose.js', () => {
  test('callable', () => {
    expect(useValidationCompose).toBeTypeOf('function');
  });

  test('return validate function', () => {
    const { validate } = useValidationCompose();

    expect(validate).toBeTypeOf('function');
  });

  describe('validate', () => {
    test('schema validate called', () => {
      const schemaValidate = vi.fn();
      const { validate } = useValidationCompose({
        validate: schemaValidate,
      });

      const data = {
        name: null,
      };

      validate(data);

      expect(schemaValidate).toHaveBeenCalledWith(data);
    });

    test('throw validation error', async () => {
      const schemaValidate = vi.fn().mockRejectedValue();
      const { validate } = useValidationCompose({
        validate: schemaValidate,
      });

      const data = {
        name: null,
      };

      expect(() => validate(data)).rejects.toThrowError(ValidationError);
    });

    test('return validated data', () => {
      const data = {
        name: 'test',
      };

      const schemaValidate = vi.fn().mockResolvedValue(data);
      const { validate } = useValidationCompose({
        validate: schemaValidate,
      });

      expect(validate(data)).resolves.toEqual(data);
    });
  });
});
