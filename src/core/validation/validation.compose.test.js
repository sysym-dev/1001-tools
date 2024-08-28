import { describe, expect, test, vi } from 'vitest';
import { useValidation } from './validation.compose';
import { ValidationError } from './validation.error';

vi.mock('./validation.error');

describe('validation.compose.js', () => {
  test('callable', () => {
    expect(useValidation).toBeTypeOf('function');
  });

  test('return validate function', () => {
    const { validate } = useValidation();

    expect(validate).toBeTypeOf('function');
  });

  describe('validate', () => {
    test('schema validate called', () => {
      const schemaValidate = vi.fn();
      const { validate } = useValidation({
        validate: schemaValidate,
      });

      const data = {
        name: null,
      };

      validate(data);

      expect(schemaValidate).toHaveBeenCalledWith(data, {
        abortEarly: false,
      });
    });

    test('throw validation error', async () => {
      const schemaValidate = vi.fn().mockRejectedValue();
      const { validate } = useValidation({
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
      const { validate } = useValidation({
        validate: schemaValidate,
      });

      expect(validate(data)).resolves.toEqual(data);
    });
  });
});
