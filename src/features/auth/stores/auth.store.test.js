import { useAuthStore } from './auth.store';
import { beforeEach, describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

describe('auth.store.js', () => {
  let authStore;
  beforeEach(() => {
    setActivePinia(createPinia());

    authStore = useAuthStore();
  });

  test('has isLoggedIn state', () => {
    expect(authStore.isLoggedIn).toBe(false);
  });

  test('has accessToken state', () => {
    expect(authStore.accessToken).toBeNull();
  });

  test('has me state', () => {
    expect(authStore.me).toEqual({
      id: null,
    });
  });

  test('login action', () => {
    authStore.login({
      accessToken: 'test',
      me: {
        id: 1,
      },
    });

    expect(authStore.isLoggedIn).toBe(true);
    expect(authStore.accessToken).toBe('test');
    expect(authStore.me).toEqual({
      id: 1,
    });
  });
});
