<script setup>
defineProps({
  box: Boolean,
});
</script>

<template>
  <div
    v-if="box"
    class="rounded-lg px-3 py-2 pb-3 border border-gray-300 min-h-[200px] text-gray-900"
  >
    <slot />
  </div>
</template>
