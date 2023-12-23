<script setup>
defineProps({
  title: {
    type: String,
    default: 'No Items Found',
  },
  message: {
    type: String,
    default: 'No items match your request or create a new item',
  },
});
</script>

<template>
  <div class="text-center">
    <h3 class="mt-2 text-sm font-semibold text-gray-900">{{ title }}</h3>
    <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
  </div>
</template>
