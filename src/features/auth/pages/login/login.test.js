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
  async function fillForm(values) {
    await findInput('email').find('input').setValue(values.email);
    await findInput('password').find('input').setValue(values.password);
  }
  async function triggerSubmitForm() {
    await formLogin.trigger('submit');
    await nextTick();
  }
  async function triggerErrorValidationSubmitForm(options = {}) {
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
  async function triggerErrorRequestSubmitForm() {
    RequestError.mockImplementation(function () {
      this.message = 'Password incorrect';

      return this;
    });

    const error = new RequestError();

    request.mockRejectedValue(error);

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
  function resetValidateSchemaMock() {
    validateSchema.mockReset();
  }
  function resetRequestMock() {
    request.mockReset();
  }

  beforeEach(() => {
    resetValidateSchemaMock();
    resetRequestMock();

    wrapper = mount(Login);
    formLogin = wrapper.find('form#login');
  });

  describe('when mounted', () => {
    test('render form login', () => {
      expect(formLogin.exists()).toBe(true);
    });

    test('render inputs', () => {
      const inputEmail = findInput('email');
      const inputPassword = findInput('password');

      testRenderInput(inputEmail, { type: 'email' });
      testRenderInput(inputPassword, { type: 'password' });
    });

    test('submit button', () => {
      const submitBtn = findSubmitBtn();

      expect(submitBtn.exists()).toBe(true);
      expect(submitBtn.props('type')).toBe('submit');
      expect(submitBtn.text()).toBe('Login');

      testButtonLoadingVisibility(false);
    });

    test('hide alert', () => {
      testAlert(false);
    });
  });

  describe('when submitted', () => {
    test('toggle button loading', async () => {
      triggerSubmitForm();

      await nextTick();

      testButtonLoadingVisibility(true);

      await flushPromises();

      testButtonLoadingVisibility(false);
    });
  });

  describe('when validate', () => {
    test('validateSchema called', async () => {
      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      await triggerSubmitForm();

      expect(validateSchema).toHaveBeenCalledWith(formValues);
    });

    test('show input error messages', async () => {
      const { error } = await triggerErrorValidationSubmitForm();

      const inputEmail = findInput('email');
      const inputPassword = findInput('password');

      testInputMessage(inputEmail, error.details.email);
      testInputMessage(inputPassword, error.details.password);
    });
  });

  describe('when request', () => {
    test('reset input error messages', async () => {
      await triggerErrorValidationSubmitForm();

      resetValidateSchemaMock();

      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      await triggerSubmitForm();

      const inputEmail = findInput('email');
      const inputPassword = findInput('password');

      expect(inputEmail.props('hasMessage')).toBe(false);
      expect(inputPassword.props('hasMessage')).toBe(false);
    });

    test('request called', async () => {
      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      await triggerSubmitForm();

      expect(request).toHaveBeenCalledWith(formValues);
    });

    test('show request error', async () => {
      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      const { error } = await triggerErrorRequestSubmitForm();

      testAlert(true, error.message);
    });

    test('reset request error', async () => {
      await triggerErrorRequestSubmitForm();

      resetRequestMock();

      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      await triggerSubmitForm();

      testAlert(false);
    });
  });
});