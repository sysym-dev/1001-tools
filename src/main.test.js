import { describe, expect, test, vi } from 'vitest';
import { app } from './main';
import { setupRouter } from 'src/core/router/setup';

vi.mock('src/core/router/setup');

describe('main.js', () => {
  test('export Vue app', () => {
    expect(app).toBeDefined();
  });

  test('setup router called', () => {
    expect(setupRouter).toBeCalledWith(app);
  });
});
