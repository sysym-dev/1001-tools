<script setup>
import { computed, ref } from 'vue';
import { debounce } from '../../utils/debounce';
import BaseSpinner from './base-spinner.vue';

const props = defineProps({
  label: String,
  placeholder: String,
  state: {
    type: String,
    default: 'normal',
  },
  type: {
    type: String,
    default: 'text',
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
  textarea: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  'update:modelValue',
  'input',
  'debounce-input',
  'focus',
  'click',
]);

const debounceEmitInput = debounce(() => emit('debounce-input'));
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

const params = computed(() => ({
  class: [
    'block border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset leading-6',
    state.value,
    width.value,
    size.value,
  ],
  placeholder: props.placeholder,
  readonly: props.readonly,
  onInput: handleInput,
  onFocus: handleFocus,
  onClick: handleClick,
}));

function handleInput() {
  emit('input');
  debounceEmitInput();
}
function handleFocus() {
  emit('focus');
}
function handleClick() {
  emit('click');
}

defineExpose({ inputEl });
</script>

<template>
  <div class="w-full">
    <label
      v-if="withLabel"
      class="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >{{ label }}</label
    >
    <div class="w-full relative">
      <slot :params="params">
        <textarea
          v-if="textarea"
          ref="inputEl"
          v-bind="params"
          v-model="value"
        ></textarea>
        <input
          v-else
          ref="inputEl"
          :type="type"
          v-bind="params"
          v-model="value"
        />
      </slot>
      <div class="absolute top-0 right-2 flex items-center h-full">
        <base-spinner v-if="loading" size="sm" />
        <slot v-else name="append" />
      </div>
    </div>
    <p v-if="message" class="mt-2 text-sm text-red-600">{{ message }}</p>
  </div>
</template>
