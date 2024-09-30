<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: String,
  iconLeft: null,
});

const buttonClasses = computed(() => {
  const sizes = {
    sm: 'py-0.5 px-2 rounded-md gap-x-1 text-sm',
  };

  return [sizes[props.size]];
});
const iconClasses = computed(() => {
  const sizes = {
    sm: 'w-3.5 h-3.5',
  };

  return [sizes[props.size]];
});
</script>

<template>
  <button :class="['border flex items-center', buttonClasses]">
    <component v-if="iconLeft" :is="iconLeft" :class="iconClasses" />
    <slot />
  </button>
</template>
