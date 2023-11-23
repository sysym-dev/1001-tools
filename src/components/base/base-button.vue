<script setup>
const props = defineProps({
  fullwidth: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    type="button"
    :class="[
      'rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
      fullwidth ? 'w-full' : '',
    ]"
  >
    <slot />
  </button>
</template>
