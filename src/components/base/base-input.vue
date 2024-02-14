<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  hasMessage: {
    type: Boolean,
    default: false,
  },
  message: String,
});
const value = defineModel();
</script>

<template>
  <input :id="id" v-model="value" />
</template>
