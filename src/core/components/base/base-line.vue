<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
    <div class="relative flex justify-center text-sm font-medium leading-6">
      <span class="bg-white px-6 text-gray-900">{{ text }}</span>
    </div>
  </div>
</template>
