<script setup>
import { computed, nextTick, ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: 'md',
  },
  modelValue: null,
  width: {
    type: String,
    default: 'fit',
  },
  position: {
    type: String,
    default: 'left',
  },
  classes: {
    type: Object,
    default: () => ({
      contentWrapper: '',
    }),
  },
  closeAfterSelect: {
    type: Boolean,
    default: true,
  },
  customWidth: String,
});
const emit = defineEmits([
  'update:modelValue',
  'click-option',
  'open',
  'close',
  'content-close',
  'select-close',
]);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const visible = ref(false);
const contentEl = ref(null);

const size = computed(() => {
  const sizes = {
    md: 'px-4 py-2 text-sm',
    sm: 'px-2 py-1 text-sm',
  };

  return sizes[props.size];
});
const width = computed(() => {
  return {
    fit: 'min-w-fit',
    full: 'min-w-full',
    custom: props.customWidth,
  }[props.width];
});
const position = computed(() => {
  return {
    right: 'right-0',
    left: 'left-0',
  }[props.position];
});

function handleVisible() {
  visible.value = !visible.value;
}
function handleClose() {
  visible.value = false;

  emit('close');
}
function handleClickOutside() {
  if (visible.value) {
    emit('content-close');

    handleClose();
  }
}
function handleClickOption(option) {
  active.value = option.id;

  if (props.closeAfterSelect) {
    handleClose();
  }

  emit('click-option', option);
}
async function handleOpen() {
  visible.value = true;

  await nextTick();

  emit('open');
}

defineExpose({
  contentEl,
});
</script>

<template>
  <div
    :class="['relative inline-block text-left', width]"
    v-click-outside="handleClickOutside"
  >
    <div>
      <slot
        name="toggle"
        :visible="visible"
        :open="handleOpen"
        :toggle="handleVisible"
      />
    </div>
    <slot name="content" :visible="visible">
      <div
        v-show="visible"
        ref="contentEl"
        :class="[
          'absolute z-10 mt-2 whitespace-nowrap origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          width,
          position,
          classes.contentWrapper,
        ]"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <slot>
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
        </slot>
      </div>
    </slot>
  </div>
</template>
