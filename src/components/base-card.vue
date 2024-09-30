<script setup>
defineProps({
  withPadding: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div :class="['bg-white border', withPadding ? 'p-4' : '']">
    <slot />
  </div>
</template>
