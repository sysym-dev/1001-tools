<script setup>
import BaseTitle from './base-title.vue';

const props = defineProps({
  title: String,
  withDescription: {
    type: Boolean,
    default: false,
  },
  description: String,
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <base-title>{{ title }}</base-title>
      <p v-if="withDescription" class="mt-2 text-sm text-gray-500">
        {{ description }}
      </p>
    </div>
    <slot name="actions" />
  </div>
</template>
