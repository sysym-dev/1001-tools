<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
});

const size = computed(() => {
  const sizes = {
    xs: 'text-base leading-6',
    md: 'text-xl leading-6',
  };

  return sizes[props.size];
});
</script>

<template>
  <h1 :class="['font-bold text-gray-900', size]">
    <slot />
  </h1>
</template>
