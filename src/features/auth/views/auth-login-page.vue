<script setup>
import BaseTitle from 'src/core/components/base/base-title.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseLink from 'src/core/components/base/base-link.vue';
import BaseLine from 'src/core/components/base/base-line.vue';
import WithState from 'src/core/components/base/base-state.vue';
import AuthSocialLoginButton from 'src/features/auth/components/auth-social-login-button.vue';
import { useRequest } from 'src/core/request/request.compose';
import { useForm } from 'src/core/composes/form.compose';
import { useAuthStore } from 'src/features/auth/auth.store';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const { form, errors, hasError, submit } = useForm({
  schema: {
    password: null,
    email: null,
  },
  validationSchema: object({
    password: string().required(),
    email: string().email().required(),
  }),
});
const {
  request,
  data: result,
  isLoading: isRequestLoading,
  isError: isRequestError,
  error: requestError,
  resetError: resetRequestError,
} = useRequest('/login', {
  method: 'post',
});

const errorMessage = computed(() => {
  if (requestError.value.type !== 'Network Error') {
    return requestError.value.message;
  }

  if (requestError.value.data.status !== 401) {
    return requestError.value.message;
  }

  return requestError.value.data.data.message;
});

async function handleSubmit() {
  try {
    resetRequestError();

    await submit();
    await request({
      data: form.value,
    });

    authStore.login(result.value.data);
    router.push({ name: 'home' });
  } catch (err) {
    //
  }
}
</script>

<template>
  <form
    class="px-4 py-20 min-w-full sm:px-0 sm:min-w-[400px] space-y-6"
    v-on:submit.prevent="handleSubmit"
  >
    <div class="space-y-4">
      <base-title>Login To Your Account</base-title>
      <p class="text-sm text-gray-500">
        Doesn't have account?
        <base-link :to="{ name: 'register' }">Register Here</base-link>
      </p>
    </div>
    <with-state
      :is-error="isRequestError"
      :error-message="isRequestError ? errorMessage : null"
    >
      <div class="space-y-4">
        <base-input
          label="Email"
          placeholder="Email"
          type="email"
          :state="hasError('email') ? 'error' : 'normal'"
          :message="hasError('email') ? errors.email : ''"
          autofocus
          v-model="form.email"
        />
        <base-input
          label="Password"
          placeholder="Password"
          type="password"
          :state="hasError('password') ? 'error' : 'normal'"
          :message="hasError('password') ? errors.password : ''"
          v-model="form.password"
        >
          <template #label-end>
            <base-link
              :to="{ name: 'forgot-password' }"
              :classes="{ base: 'text-sm' }"
              >Forgot Password</base-link
            >
          </template>
        </base-input>
        <base-button
          type="submit"
          :loading="isRequestLoading"
          :disabled="isRequestLoading"
          fullwidth
          color="sky"
          >Login</base-button
        >
      </div>
    </with-state>
    <base-line text="Or Continue With" />
    <auth-social-login-button />
  </form>
</template>
