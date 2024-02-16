import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach } from 'vitest';
import BaseButton from './base-button.vue';

describe.only('base-button.vue', () => {
  let wrapper;
  let button;

  beforeEach(() => {
    wrapper = mount(BaseButton);
    button = wrapper.find('button');
  });

  test('render button', () => {
    expect(button.exists()).toBe(true);
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('disabled')).toBe('');
    expect(button.text()).toBe('');
  });

  test('set type', async () => {
    await wrapper.setProps({
      type: 'submit',
    });

    expect(button.attributes('type')).toBe('submit');
  });

  test('set loading', async () => {
    await wrapper.setProps({
      isLoading: true,
    });

    expect(button.attributes('disabled')).toBeUndefined();
  });

  test('show slot', async () => {
    const text = 'Test';
    const wrapper = mount(BaseButton, {
      slots: {
        default: text,
      },
    });
    const button = wrapper.find('button');

    expect(button.text()).toBe(text);
  });
});
