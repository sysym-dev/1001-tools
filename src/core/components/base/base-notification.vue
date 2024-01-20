<script setup>
import BaseAlert from './base-alert.vue';

defineProps({
  items: Array,
});
</script>

<template>
  <div
    v-if="items"
    class="fixed top-0 left-1/2 -translate-x-1/2 mt-4 space-y-4 z-10 min-w-[200px]"
  >
    <base-alert v-for="(item, index) in items" :key="index" :type="item.type">{{
      item.message
    }}</base-alert>
  </div>
</template>
