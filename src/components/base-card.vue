<script setup>
defineProps({
  withPadding: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div :class="['bg-white rounded-xl border', withPadding ? 'p-6' : '']">
    <slot />
  </div>
</template>
