import { describe, expect, test, vi } from 'vitest';
import { app } from './main';
import { setupRouter } from 'src/core/router/setup';
import { routes } from 'src/routes/index';
import { setupStore } from 'src/core/store/setup';

vi.mock('src/core/router/setup');
vi.mock('src/routes/index');
vi.mock('src/core/store/setup');

describe('main.js', () => {
  test('export Vue app', () => {
    expect(app).toBeDefined();
  });

  test('setup router called', () => {
    expect(setupRouter).toBeCalledWith(app, routes);
  });

  test('setup store called', () => {
    expect(setupStore).toBeCalledWith(app);
  });
});
