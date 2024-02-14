import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Login from './login.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { validateSchema } from 'src/core/validation/validate-schema';
import { ValidationError } from 'src/core/validation/validation-error';
import { nextTick } from 'vue';

vi.mock('src/core/validation/validate-schema');
vi.mock('src/core/validation/validation-error');

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

    expect(inputEmail.exists()).toBe(true);
    expect(inputEmail.props('type')).toBe('email');
    expect(inputEmail.props('hasMessage')).toBe(false);

    expect(inputPassword.exists()).toBe(true);
    expect(inputPassword.props('type')).toBe('password');
    expect(inputPassword.props('hasMessage')).toBe(false);

    expect(submitBtn.exists()).toBe(true);
    expect(submitBtn.props('type')).toBe('submit');
    expect(submitBtn.text()).toBe('Login');
    expect(submitBtn.props('isLoading')).toBe(false);
  });

  test('toggle button loading on form submit and after submit', async () => {
    triggerSubmitForm();

    const submitBtn = findSubmitBtn();

    await nextTick();

    expect(submitBtn.props('isLoading')).toBe(true);

    await flushPromises();

    expect(submitBtn.props('isLoading')).toBe(false);
  });

  test('shows input element error messages when validate form error', async () => {
    const { error } = await triggerErrorSubmitForm();

    expect(validateSchema).toHaveBeenCalledWith({
      email: '',
      password: '',
    });

    const inputEmail = findInput('email');
    const inputPassword = findInput('password');

    expect(inputEmail.props('hasMessage')).toBe(true);
    expect(inputEmail.props('message')).toBe(error.details.email);
    expect(inputPassword.props('hasMessage')).toBe(true);
    expect(inputPassword.props('message')).toBe(error.details.password);
  });

  test('reset input element error messages when submit', async () => {
    await triggerErrorSubmitForm();

    const email = 'test@email.com';

    await findInput('email').find('input').setValue(email);

    const { error } = await triggerErrorSubmitForm({
      details: {
        password: 'password is required',
      },
    });

    expect(validateSchema).toHaveBeenCalledWith({
      email,
      password: '',
    });

    const inputEmail = findInput('email');
    const inputPassword = findInput('password');

    expect(inputEmail.props('hasMessage')).toBe(false);
    expect(inputEmail.props('message')).toBeUndefined();
    expect(inputPassword.props('hasMessage')).toBe(true);
    expect(inputPassword.props('message')).toBe(error.details.password);
  });
});
