<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: null,
    required: true,
  },
});
</script>

<template>
  <component
    :is="tag"
    class="relative flex flex-col space-3 rounded-lg border border-gray-300 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:border-gray-400"
  >
    <span class="text-sm font-medium text-gray-900">{{ title }}</span>
    <span class="truncate text-sm text-gray-500">{{ value }}</span>
  </component>
</template>
