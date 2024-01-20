<script setup>
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid';
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/vue/24/outline';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'success',
  },
  dismissable: {
    type: Boolean,
    default: false,
  },
});

const wrapperColor = computed(() => {
  return {
    success: 'bg-green-50',
    'notification-success':
      'bg-white shadow-lg ring-1 ring-black ring-opacity-5',
    error: 'bg-red-50',
    info: 'bg-sky-50',
  }[props.type];
});
const textColor = computed(() => {
  return {
    success: 'text-green-800',
    'notification-success': 'text-gray-800',
    error: 'text-red-800',
    info: 'text-sky-800',
  }[props.type];
});
const iconColor = computed(() => {
  return {
    success: 'text-green-400',
    'notification-success': 'text-green-400',
    error: 'text-red-400',
    info: 'text-sky-400',
  }[props.type];
});
const dismissColor = computed(() => {
  return {
    success:
      'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50',
    error:
      'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
    info: 'bg-sky-50 text-sky-500 hover:bg-sky-100 focus:ring-sky-600 focus:ring-offset-sky-50',
  }[props.type];
});

const icon = computed(() => {
  return {
    success: CheckCircleIcon,
    'notification-success': CheckCircleIconOutline,
    error: XCircleIcon,
    info: InformationCircleIcon,
  }[props.type];
});
</script>

<template>
  <div :class="['rounded-md p-4', wrapperColor]">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <slot name="icon">
          <component
            :is="icon"
            :class="['h-5 w-5', iconColor]"
            aria-hidden="true"
          />
        </slot>
      </div>
      <div class="ml-3">
        <p :class="['text-sm font-medium', textColor]">
          <slot />
        </p>
      </div>
      <div v-if="dismissable" class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            :class="[
              'inline-flex rounded-md p-0.25 focus:outline-none focus:ring-2 focus:ring-offset-2',
              dismissColor,
            ]"
          >
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
