<script setup>
import { computed } from 'vue';

const props = defineProps({
  weight: {
    type: String,
    default: 'medium',
  },
  color: {
    type: String,
    default: 'sky',
  },
});

const weight = computed(() => {
  return {
    medium: 'font-medium',
  }[props.weight];
});
const color = computed(() => {
  return {
    sky: 'text-sky-600 hover:text-sky-500',
  }[props.color];
});
</script>

<template>
  <a href="" :class="[color, weight]"><slot /></a>
</template>
