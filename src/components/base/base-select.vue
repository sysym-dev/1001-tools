<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  placeholder: String,
  state: {
    type: String,
    default: 'normal',
  },
  modelValue: null,
  width: {
    type: String,
    default: 'full',
  },
  size: {
    type: String,
    default: 'md',
  },
  options: {
    type: Array,
    required: true,
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
    sm: 'py-1 pl-2.5 pr-8 text-sm rounded-md',
    md: 'py-1.5 pl-3 pr-10 text-sm rounded-md',
  };

  return sizes[props.size];
});

defineExpose({ inputEl });
</script>

<template>
  <select
    ref="inputEl"
    :class="[
      'block border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset leading-6',
      state,
      size,
      width,
    ]"
    :placeholder="placeholder"
    v-model="value"
  >
    <option :value="null">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>
