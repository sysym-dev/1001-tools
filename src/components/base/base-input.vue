<script setup>
defineProps({
  box: Boolean,
  textarea: Boolean,
});

const value = defineModel();
</script>

<template>
  <div
    v-if="box"
    class="rounded-lg px-3 py-2 pb-3 border border-gray-300 min-h-[200px] text-gray-900"
  >
    <slot />
  </div>
  <textarea
    v-else-if="textarea"
    class="rounded-lg px-3 py-2 pb-3 border border-gray-300 w-full min-h-[200px] focus:ring-sky-600 focus:border-sky-600"
    v-model="value"
  ></textarea>
</template>
