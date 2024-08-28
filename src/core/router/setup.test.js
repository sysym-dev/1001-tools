import { describe, expect, test, vi } from 'vitest';
import { setupRouter } from './setup.js';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'src/routes/index.js';

vi.mock('vue-router', () => {
  return {
    createRouter: vi.fn(),
    createWebHistory: vi.fn(),
  };
});

describe('setup.js', () => {
  let app = {
    use: vi.fn(),
  };

  test('callable', () => {
    expect(setupRouter).toBeTypeOf('function');
  });

  test('createRouter called', () => {
    setupRouter(app, routes);

    expect(createRouter).toBeCalledWith({
      history: createWebHistory(),
      routes,
    });
  });

  test('app use called', () => {
    setupRouter(app);

    expect(app.use).toBeCalledWith(createRouter());
  });
});
