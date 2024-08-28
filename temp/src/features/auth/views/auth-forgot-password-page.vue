<script setup>
import BaseTitle from 'src/core/components/base/base-title.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseLink from 'src/core/components/base/base-link.vue';
import BaseAlert from 'src/core/components/base/base-alert.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { useRequest } from 'src/core/request/request.compose';
import { useForm } from 'src/core/composes/form.compose';
import { object, string } from 'yup';
import { computed, ref } from 'vue';

const { form, errors, hasError, submit } = useForm({
  schema: {
    email: null,
  },
  validationSchema: object({
    email: string().email().required(),
  }),
});
const {
  request,
  isLoading: isRequestLoading,
  isError: isRequestError,
  error: requestError,
  resetError: resetRequestError,
} = useRequest('/password/forgot', {
  method: 'post',
});
const isSuccess = ref(false);

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
  isSuccess.value = false;

  try {
    resetRequestError();

    await submit();
    await request({
      data: form.value,
    });

    isSuccess.value = true;
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
      <base-title>Forgot Password</base-title>
      <p class="text-sm text-gray-500">
        Finished updating?
        <base-link :to="{ name: 'login' }">Login Here</base-link>
      </p>
    </div>
    <base-alert v-if="isSuccess"
      >A password reset link has been sent to your email</base-alert
    >
    <with-state
      :is-error="isRequestError"
      :error-message="isRequestError ? errorMessage : null"
    >
      <div class="space-y-4">
        <base-input
          type="email"
          label="Email"
          placeholder="Email"
          :state="hasError('email') ? 'error' : 'normal'"
          :message="hasError('email') ? errors.email : ''"
          autofocus
          v-model="form.email"
        />
        <base-button
          type="submit"
          :loading="isRequestLoading"
          :disabled="isRequestLoading"
          fullwidth
          color="sky"
          >Forgot Password</base-button
        >
      </div>
    </with-state>
  </form>
</template>
