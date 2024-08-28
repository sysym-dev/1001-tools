import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach } from 'vitest';
import BaseInput from './base-input.vue';

describe('base-input.vue', () => {
  let wrapper;
  let input;

  function testMessage(exists, message) {
    const p = wrapper.find('p');

    expect(p.exists()).toBe(exists);

    if (exists) {
      expect(p.text()).toBe(message);
    }
  }

  beforeEach(() => {
    wrapper = mount(BaseInput);
    input = wrapper.find('input');
  });

  describe('mounted', () => {
    test('wrapper rendered', () => {
      expect(wrapper.find('div#base-input').exists()).toBe(true);
    });

    test('input rendered', () => {
      expect(input.exists()).toBe(true);
      expect(input.attributes('type')).toBe('text');
      expect(input.attributes('id')).toBeUndefined();
    });

    test('message hidden', () => {
      testMessage(false);
    });
  });

  test('set id', async () => {
    const id = 'test';

    await wrapper.setProps({
      id,
    });

    expect(wrapper.find(`div#base-input-${id}`).exists()).toBe(true);
    expect(input.attributes('id')).toBe(id);
  });

  test('set type', async () => {
    await wrapper.setProps({
      type: 'email',
    });

    expect(input.attributes('type')).toBe('email');
  });

  test('display message', async () => {
    const message = 'message';

    await wrapper.setProps({
      hasMessage: true,
      message,
    });

    testMessage(true, message);
  });

  test('modelValue', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'init',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    await wrapper.find('input').setValue('test');

    expect(wrapper.props('modelValue')).toBe('test');
  });
});
