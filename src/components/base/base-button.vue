<script setup>
import { computed } from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: 'gray',
  },
  disabled: Boolean,
});
const color = computed(() => {
  return {
    gray: 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200 active:border-gray-300',
    sky: 'bg-sky-600 text-white border-sky-600 hover:bg-sky-700 hover:border-sky-700 active:bg-sky-800 active:border-sky-800',
    red: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 active:bg-red-800 active:border-red-800',
  }[props.color];
});
</script>

<template>
  <component
    :is="tag"
    :disabled="disabled"
    :class="[
      'disabled:opacity-50 cursor-pointer text-center px-3 py-2 border font-semibold text-sm rounded-lg flex items-center justify-center gap-2',
      color,
    ]"
  >
    <slot />
  </component>
</template>
