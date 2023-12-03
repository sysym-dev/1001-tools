<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
});

const inputEl = ref();

defineExpose({ inputEl });
</script>

<template>
  <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">{{
    label
  }}</label>
  <input
    ref="inputEl"
    type="text"
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-sm leading-6"
    :placeholder="placeholder"
  />
</template>
