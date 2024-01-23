<script setup>
import BaseTitle from 'src/core/components/base/base-title.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { useRequest } from 'src/core/request/request.compose';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/features/auth/auth.store';

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
const {
  request,
  isError: isRequestError,
  error: requestError,
  resetError: resetRequestError,
  data: result,
} = useRequest('/login/github', {
  method: 'post',
});

const errorMessage = computed(() => {
  if (requestError.value.type !== 'Network Error') {
    return requestError.value.message;
  }

  if (requestError.value.data.status === 404) {
    return requestError.value.data.data.message;
  }

  return Object.values(requestError.value.data.data.details)[0];
});

async function handleSubmit() {
  try {
    resetRequestError();

    await request({
      data: {
        code: route.query.code,
      },
    });

    authStore.login(result.value.data);
    router.push({ name: 'home' });
  } catch (err) {}
}

handleSubmit();
</script>

<template>
  <div class="px-4 py-20 min-w-full sm:px-0 sm:min-w-[400px] space-y-6">
    <div class="space-y-4">
      <base-title>Wait a moment</base-title>
      <p class="text-sm text-gray-500">
        We are processing login using your GitHub account
      </p>
    </div>
    <with-state
      :is-error="isRequestError"
      :error-message="isRequestError ? errorMessage : null"
    >
    </with-state>
  </div>
</template>
