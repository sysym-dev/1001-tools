<script setup>
import BaseTitle from './base-title.vue';

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex items-center justify-between">
    <base-title>{{ title }}</base-title>
    <slot name="actions" />
  </div>
</template>
