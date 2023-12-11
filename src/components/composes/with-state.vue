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
  errorMessage: String,
});
</script>

<template>
  <base-alert v-if="error" type="error">{{ errorMessage }}</base-alert>
  <template v-else>
    <with-loading :loading="loading">
      <slot />
    </with-loading>
  </template>
</template>
