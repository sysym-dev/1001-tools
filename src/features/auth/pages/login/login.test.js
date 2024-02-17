import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Login from './login.vue';
import BaseButton from 'src/components/base/base-button/base-button.vue';
import { ValidationError } from 'src/core/validation/validation.error';
import { nextTick } from 'vue';
import { request } from 'src/core/request/request';
import { RequestError } from 'src/core/request/request.error';
import { useAuthStore } from 'src/features/auth/stores/auth.store';
import { useRouter } from 'vue-router';
import { useValidation } from 'src/core/validation/validation.compose';

vi.mock('src/core/validation/validation.error');
vi.mock('src/core/request/request');
vi.mock('src/core/request/request.error');
vi.mock('src/core/validation/validation.compose', () => {
  const validate = vi.fn();

  return {
    useValidation: () => {
      return {
        validate,
      };
    },
  };
});
vi.mock('src/features/auth/stores/auth.store', () => {
  const login = vi.fn();

  return {
    useAuthStore: () => ({
      login,
    }),
  };
});
vi.mock('vue-router', () => {
  const push = vi.fn();

  return {
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

describe('login.vue', () => {
  let wrapper;
  let formLogin;

  function findInput(id) {
    return formLogin.findComponent(`#base-input-${id}`);
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

    useValidation().validate.mockRejectedValue(error);

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
    useValidation().validate.mockReset();
  }
  function resetRequestMock() {
    request.mockReset();
  }
  function mockRequestResolvedValue() {
    const res = {
      data: {
        accessToken: 'example',
        me: {
          email: 'test@email.com',
        },
      },
    };

    request.mockResolvedValue(res);

    return { res };
  }

  beforeEach(() => {
    resetValidateSchemaMock();
    resetRequestMock();

    wrapper = mount(Login);
    formLogin = wrapper.find('form#login');
  });

  describe('mounted', () => {
    test('render form login rendered', () => {
      expect(formLogin.exists()).toBe(true);
    });

    test('inputs rendered', () => {
      const inputEmail = findInput('email');
      const inputPassword = findInput('password');

      testRenderInput(inputEmail, { type: 'email' });
      testRenderInput(inputPassword, { type: 'password' });
    });

    test('submit button rendered', () => {
      const submitBtn = findSubmitBtn();

      expect(submitBtn.exists()).toBe(true);
      expect(submitBtn.props('type')).toBe('submit');
      expect(submitBtn.text()).toBe('Login');

      testButtonLoadingVisibility(false);
    });

    test('alert hidden', () => {
      testAlert(false);
    });
  });

  describe('submited', () => {
    test('button loading toggled', async () => {
      triggerSubmitForm();

      await nextTick();

      testButtonLoadingVisibility(true);

      await flushPromises();

      testButtonLoadingVisibility(false);
    });
  });

  describe('validated', () => {
    test('validate called', async () => {
      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      await triggerSubmitForm();

      expect(useValidation().validate).toHaveBeenCalledWith(formValues);
    });

    test('input error messages visible', async () => {
      const { error } = await triggerErrorValidationSubmitForm();

      const inputEmail = findInput('email');
      const inputPassword = findInput('password');

      testInputMessage(inputEmail, error.details.email);
      testInputMessage(inputPassword, error.details.password);
    });
  });

  describe('requested', () => {
    test('input error messages hidden', async () => {
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

    test('request error visible', async () => {
      const formValues = {
        email: 'test@email.com',
        password: 'password',
      };

      await fillForm(formValues);
      const { error } = await triggerErrorRequestSubmitForm();

      testAlert(true, error.message);
    });

    test('request error hidden', async () => {
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

    test('auth store login action called', async () => {
      const { res } = mockRequestResolvedValue();

      await triggerSubmitForm();

      expect(useAuthStore().login).toHaveBeenCalledWith(res.data);
    });

    test('route redirected to home', async () => {
      mockRequestResolvedValue();

      await triggerSubmitForm();

      expect(useRouter().push).toHaveBeenCalledWith({ name: 'home' });
    });
  });
});
