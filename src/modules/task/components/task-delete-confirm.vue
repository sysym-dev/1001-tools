<script setup>
import BaseConfirm from 'src/components/base/base-confirm.vue';
import { computed, inject } from 'vue';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  taskId: Number,
});
const emit = defineEmits(['update:visible', 'close', 'deleted']);
const emitter = inject('emitter');

const { isError, error, request, isLoading, resetError } = useRequest('tasks', {
  method: 'delete',
});

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

function handleOpen() {
  resetError();
}
function handleCloseModal() {
  emit('close');
}
async function handleConfirm() {
  try {
    await request({
      url: `/tasks/${props.taskId}`,
    });

    emitter.emit('tasks-deleted');

    emit('deleted');
  } catch (err) {}
}
</script>

<template>
  <base-confirm
    title="Delete Task"
    description="Are you sure want to delete this task?"
    type="error"
    action="Delete"
    cancelable
    :loading="isLoading"
    :is-error="isError"
    :error-message="isError ? error.message : null"
    v-model:visible="visible"
    v-on:open="handleOpen"
    v-on:close="handleCloseModal"
    v-on:confirm="handleConfirm"
  />
</template>
