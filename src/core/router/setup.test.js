import { describe, expect, test, vi } from 'vitest';
import { setupRouter } from './setup.js';
import { createRouter } from 'vue-router';

vi.mock('vue-router', () => {
  return {
    createRouter: vi.fn(),
  };
});

describe('setup.js', () => {
  test('callable', () => {
    expect(setupRouter).toBeTypeOf('function');
  });

  test('app use called', () => {
    const app = {
      use: vi.fn(),
    };

    setupRouter(app);

    expect(app.use).toBeCalledWith(createRouter());
  });
});
