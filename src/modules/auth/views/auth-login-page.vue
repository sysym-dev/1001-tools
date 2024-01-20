<script setup>
import BaseTitle from 'src/core/components/base/base-title.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseLink from 'src/core/components/base/base-link.vue';
import WithState from 'src/components/composes/with-state.vue';
import { useRequest } from 'src/composes/request.compose';
import { useForm } from 'src/composes/form.compose';
import { useAuthStore } from 'src/modules/auth/auth.store';
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
    <base-title centered>Login To Your Account</base-title>
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
        />
        <base-button
          type="submit"
          :loading="isRequestLoading"
          :disabled="isRequestLoading"
          fullwidth
          color="sky"
          >Login</base-button
        >
        <p class="text-sm text-center text-gray-500">
          Doesn't have account?
          <base-link :to="{ name: 'register' }">Register Here</base-link>
        </p>
      </div>
    </with-state>
  </form>
</template>
