<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'open']);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

watch(visible, (value) => {
  if (value) {
    emit('open');
  }
});
</script>

<template>
  <div v-if="visible" class="relative z-10">
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <div class="transform transition-all shadow-xl w-full max-w-sm">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
