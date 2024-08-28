<script setup>
import BaseTitle from 'src/core/components/base/base-title.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseLink from 'src/core/components/base/base-link.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { useRequest } from 'src/core/request/request.compose';
import { useForm } from 'src/core/composes/form.compose';
import { object, ref, string } from 'yup';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { form, errors, hasError, submit } = useForm({
  schema: {
    password_confirmation: null,
    password: null,
  },
  validationSchema: object({
    password_confirmation: string()
      .required()
      .oneOf([ref('password')], "password confirmation doesn't match"),
    password: string().required(),
  }),
});
const {
  request,
  isLoading: isRequestLoading,
  isError: isRequestError,
  error: requestError,
  resetError: resetRequestError,
} = useRequest('/password/reset', {
  method: 'post',
});

const errorMessage = computed(() => {
  if (requestError.value.type !== 'Network Error') {
    return requestError.value.message;
  }

  if (requestError.value.data.status === 404) {
    return requestError.value.data.data.message;
  }

  if (requestError.value.data.status !== 422) {
    return requestError.value.message;
  }

  return Object.values(requestError.value.data.data.details)[0];
});

async function handleSubmit() {
  try {
    resetRequestError();

    await submit();
    await request({
      data: {
        token: route.query.token,
        ...form.value,
      },
    });

    router.push({ name: 'home' });
  } catch (err) {
    //
  }
}

if (!route.query.token) {
  router.push({ name: 'not-found' });
}
</script>

<template>
  <form
    class="px-4 py-20 min-w-full sm:px-0 sm:min-w-[400px] space-y-6"
    v-on:submit.prevent="handleSubmit"
  >
    <div class="space-y-4">
      <base-title>Reset Password</base-title>
      <p class="text-sm text-gray-500">
        Finished updating?
        <base-link :to="{ name: 'login' }">Login Here</base-link>
      </p>
    </div>
    <with-state
      :is-error="isRequestError"
      :error-message="isRequestError ? errorMessage : null"
    >
      <div class="space-y-4">
        <base-input
          type="password"
          label="Password"
          placeholder="Password"
          :state="hasError('password') ? 'error' : 'normal'"
          :message="hasError('password') ? errors.password : ''"
          autofocus
          v-model="form.password"
        />
        <base-input
          type="password"
          label="Password Confirmation"
          placeholder="Password Confirmation"
          :state="hasError('password_confirmation') ? 'error' : 'normal'"
          :message="
            hasError('password_confirmation')
              ? errors.password_confirmation
              : ''
          "
          v-model="form.password_confirmation"
        />
        <base-button
          type="submit"
          :loading="isRequestLoading"
          :disabled="isRequestLoading"
          fullwidth
          color="sky"
          >Reset Password</base-button
        >
      </div>
    </with-state>
  </form>
</template>
