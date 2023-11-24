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
    class="flex flex-col ring-1 ring-inset ring-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
  >
    <span class="text-base font-semibold text-gray-900 leading-7">{{
      title
    }}</span>
    <span class="text-sm leading-6 text-gray-500">{{ value }}</span>
  </component>
</template>
