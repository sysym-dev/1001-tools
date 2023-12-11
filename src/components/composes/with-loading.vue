<script setup>
import BaseSkeleton from 'src/components/base/base-skeleton.vue';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <base-skeleton v-if="loading"></base-skeleton>
  <slot v-else />
</template>
