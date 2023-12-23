<script setup>
import BaseModal from './base-modal.vue';
import BaseCard from './base-card.vue';
import BaseButton from './base-button.vue';
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import WithState from 'src/components/composes/with-state.vue';

const props = defineProps({
  title: String,
  description: String,
  action: String,
  type: {
    type: String,
    default: 'default',
  },
  cancelable: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
});
const emit = defineEmits(['update:visible', 'close', 'open', 'confirm']);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});
const icon = computed(() => {
  return {
    default: CheckIcon,
    error: ExclamationCircleIcon,
  }[props.type];
});
const buttonColor = computed(() => {
  return {
    default: 'sky',
    error: 'red',
  }[props.type];
});
const iconBgColor = computed(() => {
  return {
    default: 'bg-green-100',
    error: 'bg-red-100',
  }[props.type];
});
const iconColor = computed(() => {
  return {
    default: 'text-green-600',
    error: 'text-red-600',
  }[props.type];
});

function handleOpen() {
  emit('open');
}
function handleClosed() {
  emit('close');
}
function handleClose() {
  visible.value = false;
}
function handleConfirm() {
  emit('confirm');
}
</script>

<template>
  <base-modal
    v-model:visible="visible"
    v-on:open="handleOpen"
    v-on:close="handleClosed"
  >
    <base-card
      :with-header="false"
      :with-footer="false"
      v-on:click-outside="handleClose"
    >
      <div>
        <div
          :class="[
            'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
            iconBgColor,
          ]"
        >
          <component
            :is="icon"
            :class="['h-6 w-6', iconColor]"
            aria-hidden="true"
          />
        </div>
        <with-state
          :error="isError"
          :error-message="errorMessage"
          class="mt-3 sm:mt-5"
          block-error
        >
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              {{ title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">{{ description }}</p>
            </div>
          </div>
        </with-state>
      </div>
      <div
        :class="[
          'mt-5 sm:mt-6',
          cancelable &&
            'sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3',
        ]"
      >
        <base-button
          v-if="cancelable"
          size="lg"
          fullwidth
          v-on:click="handleClose"
          >Cancel</base-button
        >
        <base-button
          :color="buttonColor"
          size="lg"
          fullwidth
          :loading="loading"
          :disabled="loading"
          v-on:click="handleConfirm"
          >{{ action }}</base-button
        >
      </div>
    </base-card>
  </base-modal>
</template>
