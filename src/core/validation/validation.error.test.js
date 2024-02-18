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
    const errorName = new YupValidationError('name is required', '', 'name');
    const error = new ValidationError(new YupValidationError([errorName]));

    expect(error.details).toEqual({
      name: 'name is required',
    });
  });
});
