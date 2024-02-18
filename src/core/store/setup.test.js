import { describe, expect, vi, test } from 'vitest';
import { setupStore } from './setup';
import { createPinia } from 'pinia';

vi.mock('pinia', () => {
  return {
    createPinia: vi.fn(),
  };
});

describe('setup.js', () => {
  let app = {
    use: vi.fn(),
  };

  test('callable', () => {
    expect(setupStore).toBeTypeOf('function');
  });

  test('createPinia called', () => {
    setupStore(app);

    expect(createPinia).toBeCalled();
  });

  test('app use called', () => {
    setupStore(app);

    expect(app.use).toBeCalledWith(createPinia());
  });
});
