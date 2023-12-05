<script setup>
import BaseTitle from './base-title.vue';

const props = defineProps({
  title: String,
  classes: {
    type: Object,
    default: () => ({
      body: '',
    }),
  },
  bodyNoPadding: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click-outside']);

function handleClickOutside() {
  emit('click-outside');
}
</script>

<template>
  <div v-click-outside="handleClickOutside">
    <div
      class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-t-lg"
    >
      <base-title size="xs">{{ title }}</base-title>
    </div>
    <div
      :class="[
        'bg-white text-sm text-gray-500',
        classes.body,
        bodyNoPadding ? 'p-0' : 'px-4 py-5 sm:px-6',
      ]"
    >
      <slot />
    </div>
    <div class="border-t bg-white px-4 py-5 sm:px-6 rounded-b-lg">
      <slot name="footer" />
    </div>
  </div>
</template>
