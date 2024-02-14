import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Login from './login.vue';

describe('login.vue', () => {
  test('render form', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('form#login').exists()).toBe(true);
  });

  test('render input email', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('input#email[name=email]').exists()).toBe(true);
  });

  test('render input password', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('input#password[name=password]').exists()).toBe(true);
  });

  test('render login button', () => {
    const wrapper = mount(Login);

    const submitBtn = wrapper.find('button#submit[name=submit]');

    expect(submitBtn.exists()).toBe(true);
    expect(submitBtn.text()).toBe('Login');
  });
});
