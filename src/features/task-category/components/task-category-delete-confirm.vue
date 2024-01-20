<script setup>
import BaseConfirm from 'src/core/components/base/base-confirm.vue';
import { computed, inject } from 'vue';
import { useRequest } from 'src/core/request/request.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  taskCategoryId: Number,
});
const emit = defineEmits(['update:visible', 'close']);
const emitter = inject('emitter');

const { isError, error, request, isLoading, resetError } = useRequest(
  'task-categories',
  {
    method: 'delete',
  },
);

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
      url: `/task-categories/${props.taskCategoryId}`,
    });

    visible.value = false;

    emitter.emit('task-categories-deleted');
  } catch (err) {}
}
</script>

<template>
  <base-confirm
    title="Delete Category"
    description="Are you sure want to delete this category?"
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
