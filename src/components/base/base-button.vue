<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <slot />
</template>
