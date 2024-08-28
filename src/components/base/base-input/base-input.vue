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
  <div :id="id ? `base-input-${id}` : 'base-input'">
    <input :id="id" :type="type" v-model="value" />
    <p v-if="hasMessage">{{ message }}</p>
  </div>
</template>
