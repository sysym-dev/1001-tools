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
  <button :type="type" :disabled="isLoading">
    <slot />
  </button>
</template>
