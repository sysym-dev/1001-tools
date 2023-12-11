<script setup>
import BaseConfirm from 'src/components/base/base-confirm.vue';
import { computed } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'close']);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

function handleCloseModal() {
  emit('close');
}
</script>

<template>
  <base-confirm
    title="Delete Task"
    description="Are you sure want to delete this task?"
    type="error"
    action="Delete"
    cancelable
    v-model:visible="visible"
    v-on:close="handleCloseModal"
  />
</template>
