import { RequestError } from './request.error';
import { describe, expect, test } from 'vitest';

describe('request.error.js', () => {
  test('callable', () => {
    expect(RequestError).toBeTypeOf('function');
  });

  test('has message property', () => {
    const error = new RequestError();

    expect(error).toHaveProperty('message');
    expect(error.message).toBeUndefined();
  });

  test('set message from response error', () => {
    const error = new RequestError({
      response: {
        data: {
          message: 'Test',
        },
      },
    });

    expect(error.message).toBe('Test');
  });

  test('set message from request error', () => {
    const error = new RequestError(new Error('Test'));

    expect(error.message).toBe('Test');
  });
});
