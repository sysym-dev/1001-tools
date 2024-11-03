<script setup>
import { AlertTriangle as AlertIcon, X as CloseIcon } from '@vicons/tabler';

defineProps({
  closable: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['close']);

function onClose() {
  emit('close');
}
</script>

<template>
  <div
    class="bg-red-50 text-red-800 rounded-lg px-3 py-2 text-left font-semibold flex items-start justify-between"
  >
    <div class="flex gap-x-3">
      <alert-icon class="w-4 h-4 mt-1" />
      <slot />
    </div>
    <button v-if="closable" class="mt-1" @click="onClose">
      <close-icon class="w-4 h-4" />
    </button>
  </div>
</template>
