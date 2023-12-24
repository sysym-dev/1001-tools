<script setup>
import BaseSkeleton from 'src/components/base/base-skeleton.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import BaseSpinner from 'src/components/base//base-spinner.vue';
import BaseEmpty from 'src/components/base//base-empty.vue';

defineProps({
  loadingType: {
    type: String,
    default: 'skeleton',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  isErrorBlocking: {
    type: Boolean,
    default: false,
  },
  isLoadingBlocking: {
    type: Boolean,
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
});
</script>

<template>
  <base-skeleton v-if="loadingType === 'skeleton' && isLoading" />
  <base-alert v-if="isError" type="error">{{ errorMessage }}</base-alert>
  <base-alert
    v-if="loadingType === 'alert-before-content' && isLoading"
    type="info"
  >
    <template #icon>
      <base-spinner size="sm" />
    </template>
    {{ 'Loading' }}
  </base-alert>
  <template
    v-if="(!isError || !isErrorBlocking) && (!isLoading || !isLoadingBlocking)"
  />
  <base-empty v-if="isEmpty" />
  <slot v-else> </slot>
  <base-alert
    v-if="loadingType === 'alert-after-content' && isLoading"
    type="info"
  >
    <template #icon>
      <base-spinner size="sm" />
    </template>
    {{ 'Loading' }}
  </base-alert>
</template>
