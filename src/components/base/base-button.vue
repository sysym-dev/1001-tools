<script setup>
import { computed } from 'vue';

const props = defineProps({
  fullwidth: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'white',
  },
});

const color = computed(() => {
  const colors = {
    white:
      'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 ring-1 ring-inset',
    sky: 'bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
  };

  return colors[props.color];
});
</script>
<template>
  <button
    type="button"
    :class="[
      'rounded-md px-2.5 py-1.5 text-sm font-semibold',
      fullwidth ? 'w-full' : '',
      color,
    ]"
  >
    <slot />
  </button>
</template>
