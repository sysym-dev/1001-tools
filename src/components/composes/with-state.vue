<script setup>
import BaseAlert from 'src/components/base/base-alert.vue';
import WithLoading from './with-loading.vue';

defineProps({
  error: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  blockError: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
});
</script>

<template>
  <div>
    <base-alert v-if="error" type="error">{{ errorMessage }}</base-alert>
    <with-loading v-if="!blockError || !error" :loading="loading">
      <slot />
    </with-loading>
  </div>
</template>
