<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  state: {
    type: String,
    default: 'normal',
  },
  message: String,
});

const inputEl = ref();

const state = computed(() => {
  return {
    normal:
      'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-sky-600',
    error:
      'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
  }[props.state];
});

defineExpose({ inputEl });
</script>

<template>
  <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">{{
    label
  }}</label>
  <input
    ref="inputEl"
    type="text"
    :class="[
      'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm leading-6',
      state,
    ]"
    :placeholder="placeholder"
  />
  <p v-if="message" class="mt-2 text-sm text-red-600">{{ message }}</p>
</template>
