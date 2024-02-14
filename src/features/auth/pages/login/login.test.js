import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Login from './login.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { validateSchema } from 'src/core/validation/validate-schema';
import { ValidationError } from 'src/core/validation/validation.error';
import { nextTick } from 'vue';
import { request } from 'src/core/request/request';
import { RequestError } from 'src/core/request/request.error';

vi.mock('src/core/validation/validate-schema');
vi.mock('src/core/validation/validation.error');
vi.mock('src/core/request/request');
vi.mock('src/core/request/request.error');

describe('login.vue', () => {
  let wrapper;
  let formLogin;

  function findInput(id) {
    return formLogin.findComponent(`#${id}`);
  }
  function findSubmitBtn() {
    return formLogin.findComponent(BaseButton);
  }
  async function triggerSubmitForm() {
    await formLogin.trigger('submit');
    await nextTick();
  }
  async function triggerErrorSubmitForm(options = {}) {
    ValidationError.mockImplementation(function () {
      this.details = options.details ?? {
        email: 'email is required',
        password: 'password is required',
      };

      return this;
    });

    const error = new ValidationError();

    validateSchema.mockRejectedValue(error);

    await triggerSubmitForm();

    return { error };
  }
  function testRenderInput(input, options) {
    expect(input.exists()).toBe(true);
    expect(input.props('type')).toBe(options.type);
    expect(input.props('hasMessage')).toBe(false);
  }
  function testButtonLoadingVisibility(value) {
    const submitBtn = findSubmitBtn();

    expect(submitBtn.props('isLoading')).toBe(value);
  }
  function testInputMessage(input, message) {
    expect(input.props('hasMessage')).toBe(true);
    expect(input.props('message')).toBe(message);
  }
  function testAlert(value, message = null) {
    const alert = wrapper.find('#alert');

    expect(alert.exists()).toBe(value);

    if (message) {
      expect(alert.text()).toBe(message);
    }
  }
  async function fillForm(values) {
    await findInput('email').find('input').setValue(values.email);
    await findInput('password').find('input').setValue(values.password);
  }

  beforeEach(() => {
    validateSchema.mockReset();

    wrapper = mount(Login);
    formLogin = wrapper.find('form#login');
  });

  test('render form element', () => {
    expect(formLogin.exists()).toBe(true);

    const inputEmail = findInput('email');
    const inputPassword = findInput('password');
    const submitBtn = findSubmitBtn();

    testRenderInput(inputEmail, { type: 'email' });
    testRenderInput(inputPassword, { type: 'password' });

    expect(submitBtn.exists()).toBe(true);
    expect(submitBtn.props('type')).toBe('submit');
    expect(submitBtn.text()).toBe('Login');

    testButtonLoadingVisibility(false);
    testAlert(false);
  });

  test('toggle button loading when form submitted', async () => {
    triggerSubmitForm();

    await nextTick();

    testButtonLoadingVisibility(true);

    await flushPromises();

    testButtonLoadingVisibility(false);
  });

  test('show input error message when validate form error', async () => {
    const { error } = await triggerErrorSubmitForm();

    expect(validateSchema).toHaveBeenCalledWith({
      email: '',
      password: '',
    });

    const inputEmail = findInput('email');
    const inputPassword = findInput('password');

    testInputMessage(inputEmail, error.details.email);
    testInputMessage(inputPassword, error.details.password);
  });

  test('reset input error message when submit', async () => {
    await triggerErrorSubmitForm();

    const formValues = {
      email: 'test@email.com',
      password: '',
    };

    await fillForm(formValues);

    const { error } = await triggerErrorSubmitForm({
      details: {
        password: 'password is required',
      },
    });

    expect(validateSchema).toHaveBeenCalledWith(formValues);

    const inputEmail = findInput('email');
    const inputPassword = findInput('password');

    expect(inputEmail.props('hasMessage')).toBe(false);
    expect(inputEmail.props('message')).toBeUndefined();

    testInputMessage(inputPassword, error.details.password);
  });

  test('show request error when request error', async () => {
    const formValues = {
      email: 'test@email.com',
      password: 'password',
    };

    await fillForm(formValues);

    RequestError.mockImplementation(function () {
      this.message = 'Password incorrect';

      return this;
    });

    const error = new RequestError();

    request.mockRejectedValue(error);

    await triggerSubmitForm();

    expect(request).toHaveBeenCalledWith(formValues);

    testAlert(true, error.message);
  });
});
