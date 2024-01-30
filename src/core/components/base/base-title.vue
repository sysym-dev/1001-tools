<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  centered: {
    type: Boolean,
    default: false,
  },
  noLeading: {
    type: Boolean,
    default: false,
  },
  tight: {
    type: Boolean,
    default: false,
  },
});

const size = computed(() => {
  const sizes = {
    xs: ['text-base', !props.noLeading && 'leading-6'],
    md: ['text-xl', !props.noLeading && 'leading-6'],
    lg: ['text-2xl', !props.noLeading && 'leading-6'],
    xl: ['text-3xl', !props.noLeading && 'leading-6'],
    '2xl': ['text-4xl', !props.noLeading && 'leading-6'],
    '3xl': ['text-3xl sm:text-5xl', !props.noLeading && 'leading-6'],
  };

  return sizes[props.size];
});
</script>

<template>
  <h1
    :class="[
      'font-bold text-gray-900',
      centered && 'text-center',
      size,
      tight && 'tracking-tight',
    ]"
  >
    <slot />
  </h1>
</template>
