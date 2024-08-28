import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import App from './App.vue';
import { RouterView, createRouter, createWebHistory } from 'vue-router';

describe('App.vue', () => {
  test('router-view rendered', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: RouterView,
        },
      ],
    });

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent(RouterView).exists()).toBe(true);
  });
});
