<script setup>
import BaseLink from 'src/core/components/base/base-link.vue';
import BaseAlert from 'src/core/components/base/base-alert.vue';
import BaseSpinner from 'src/core/components/base/base-spinner.vue';
import { useRequest } from 'src/core/composes/request.compose';
import { useAuthStore } from 'src/modules/auth/auth.store';
import { inject } from 'vue';

const emitter = inject('emitter');

const authStore = useAuthStore();
const {
  isLoading,
  request: submit,
  error,
} = useRequest('/email/resend', {
  method: 'post',
});

async function handleClickResend() {
  try {
    await submit({
      data: {
        email: authStore.me.email,
      },
    });

    emitter.emit('create-notification', {
      type: 'notification-success',
      message: 'Email Verification Link Sent',
    });
  } catch (err) {
    emitter.emit('create-notification', {
      type: 'notification-error',
      message: error.value.message,
    });
  }
}
</script>

<template>
  <base-alert type="warning">
    <p>
      Your email has not been verified, check your email inbox for the link, or
      <base-link
        v-if="!isLoading"
        color="custom"
        weight="bold"
        :classes="{ base: 'underline' }"
        :prevent-click="true"
        v-on:click="handleClickResend"
        >resend the verification link</base-link
      >
      <base-spinner
        v-else
        size="sm"
        color="yellow"
        :classes="{ base: 'inline ml-2' }"
      />
    </p>
  </base-alert>
</template>
