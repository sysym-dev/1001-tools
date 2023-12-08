<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  state: {
    type: String,
    default: 'normal',
  },
  message: String,
  modelValue: null,
  withLabel: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: 'full',
  },
  size: {
    type: String,
    default: 'md',
  },
});
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const inputEl = ref();

const state = computed(() => {
  return {
    normal:
      'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-sky-600',
    error:
      'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
  }[props.state];
});
const width = computed(() => {
  return {
    full: 'w-full',
    fit: 'w-fit',
  }[props.width];
});
const size = computed(() => {
  const sizes = {
    sm: 'py-1 pl-2.5 pr-8 text-sm rounded',
    md: 'py-1.5 pl-3 pr-10 text-sm rounded-md',
  };

  return sizes[props.size];
});

defineExpose({ inputEl });
</script>

<template>
  <label
    v-if="withLabel"
    class="block text-sm font-medium leading-6 text-gray-900 mb-2"
    >{{ label }}</label
  >
  <input
    ref="inputEl"
    type="text"
    :class="[
      'block border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset leading-6',
      state,
      width,
      size,
    ]"
    :placeholder="placeholder"
    v-model="value"
  />
  <p v-if="message" class="mt-2 text-sm text-red-600">{{ message }}</p>
</template>
