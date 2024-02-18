import { ValidationError as YupValidationError } from 'yup';
import { describe, expect, test } from 'vitest';
import { ValidationError } from './validation.error';

describe('validation.error.js', () => {
  test('callable', () => {
    expect(ValidationError).toBeTypeOf('function');
  });

  test('has details property', () => {
    const error = new ValidationError();

    expect(error).toHaveProperty('details');
    expect(error.details).toEqual({});
  });

  test('constructor', () => {
    const error = new ValidationError(
      new YupValidationError({
        path: 'name',
        errors: 'name is required',
      }),
    );

    expect(error.details).toEqual({
      name: 'name is required',
    });
  });
});
