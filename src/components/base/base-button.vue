<script setup>
import { computed } from 'vue';

const props = defineProps({
  fullwidth: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'white',
  },
  size: {
    type: String,
    default: 'md',
  },
  classes: {
    type: Object,
    default: () => ({
      base: '',
    }),
  },
  circle: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  customColor: String,
  customSize: String,
});
const emit = defineEmits(['click']);

const color = computed(() => {
  const colors = {
    white:
      'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 ring-1 ring-inset',
    sky: 'bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
    green:
      'bg-green-600 text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
    red: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600',
  };

  return colors[props.color];
});
const size = computed(() => {
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded gap-x-1.5',
    sm: 'px-2 py-1 text-sm rounded gap-x-1.5',
    md: 'px-2.5 py-1.5 text-sm rounded-md gap-x-1.5',
    lg: 'px-3 py-2 text-sm rounded-md gap-x-2',
    xl: props.circle
      ? 'p-3 text-sm rounded-full'
      : 'px-3.5 py-2.5 text-sm rounded-md gap-x-2',
  };

  return sizes[props.size];
});

function handleClick() {
  emit('click');
}
</script>
<template>
  <button
    :type="type"
    :class="[
      'font-semibold inline-flex items-center justify-center',
      classes.base,
      fullwidth ? 'w-full' : '',
      customColor ?? color,
      customSize ?? size,
    ]"
    v-on:click="handleClick"
  >
    <slot name="prepend" />
    <slot />
    <slot name="append" />
  </button>
</template>
