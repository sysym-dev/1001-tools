import { describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { request } from './request';
import { RequestError } from './request.error';

vi.mock('axios', () => {
  return {
    default: vi.fn().mockResolvedValue({ data: null }),
  };
});
vi.mock('./request.error');

describe('request.js', () => {
  test('callable', () => {
    expect(request).toBeTypeOf('function');
  });

  test('axios called', async () => {
    await request('/test');

    expect(axios).toHaveBeenCalledWith({
      url: '/test',
      method: 'get',
    });
  });

  test('different method', async () => {
    await request('/test', {
      method: 'post',
    });

    expect(axios).toHaveBeenCalledWith({
      url: '/test',
      method: 'post',
    });
  });

  test('send params', async () => {
    const params = {
      q: 'test',
    };

    await request('/test', {
      params,
    });

    expect(axios).toHaveBeenCalledWith({
      url: '/test',
      method: 'get',
      params,
    });
  });

  test('send data', async () => {
    const data = {
      q: 'test',
    };

    await request('/test', {
      method: 'post',
      data,
    });

    expect(axios).toHaveBeenCalledWith({
      url: '/test',
      method: 'post',
      data,
    });
  });

  test('return data', async () => {
    const data = {
      id: 1,
    };

    axios.mockResolvedValue({
      data,
    });

    expect(request('/test')).resolves.toEqual(data);
  });

  test('throw error', async () => {
    const message = 'Id is not found';

    RequestError.mockImplementation(function (message) {
      this.message = message;

      return this;
    });

    axios.mockRejectedValue({
      response: {
        data: {
          message,
        },
      },
    });

    expect(() => request('/test')).rejects.toThrowError(RequestError);
    expect(() => request('/test')).rejects.toThrowError(message);
  });
});
