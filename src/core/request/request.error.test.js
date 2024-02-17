import { RequestError } from './request.error';
import { describe, expect, test } from 'vitest';

describe('request.error.js', () => {
  test('callable', () => {
    expect(RequestError).toBeTypeOf('function');
  });

  test('has error message', () => {
    const error = new RequestError();

    expect(error).toHaveProperty('message');
    expect(error.message).toBeUndefined();
  });

  test('response error message', () => {
    const error = new RequestError({
      response: {
        data: {
          message: 'Test',
        },
      },
    });

    expect(error.message).toBe('Test');
  });

  test('request error message', () => {
    const error = new RequestError(new Error('Test'));

    expect(error.message).toBe('Test');
  });
});
