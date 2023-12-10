<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  size: {
    type: String,
    default: 'md',
  },
  modelValue: null,
});
const emit = defineEmits(['update:modelValue', 'click-option']);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const visible = ref(false);

const size = computed(() => {
  const sizes = {
    md: 'px-4 py-2 text-sm',
    sm: 'px-2 py-1 text-sm',
  };

  return sizes[props.size];
});

function handleVisible() {
  visible.value = !visible.value;
}
function handleClose() {
  visible.value = false;
}
function handleClickOption(option) {
  active.value = option.id;

  handleClose();

  emit('click-option', option);
}
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <slot name="toggle" :toggle="handleVisible" />
    </div>
    <div
      v-if="visible"
      class="absolute right-0 z-10 mt-2 w-fit whitespace-nowrap origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
      v-click-outside="handleClose"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          v-for="option in options"
          :key="option.id"
          href="#"
          :class="[
            'text-gray-700 block hover:bg-gray-100 hover:text-gray-900',
            size,
            option.id === active && 'bg-gray-100 text-gray-900',
          ]"
          tabindex="-1"
          v-on:click.prevent="handleClickOption(option)"
          >{{ option.name }}</a
        >
      </div>
    </div>
  </div>
</template>
