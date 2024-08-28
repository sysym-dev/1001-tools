<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  value: null,
  modelValue: null,
});
const emit = defineEmits(['update:modelValue', 'change']);

const checked = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function handleChange() {
  emit('change');
}
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex h-6 items-center">
      <input
        :id="id"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
        :value="value"
        v-model="checked"
        v-on:change="handleChange"
      />
    </div>
    <div class="ml-3 text-sm leading-6">
      <label :for="id" class="font-medium text-gray-900">{{ label }}</label>
    </div>
  </div>
</template>
