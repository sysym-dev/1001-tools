<script setup lang="ts">
import { NButton } from 'naive-ui';
import { Todo } from 'src/modules/todo/todo.entity';
import { useUpdateResource } from 'src/common/resource/composes/update-resource.compose';

const props = defineProps<{
  todo: Todo;
}>();
const emit = defineEmits<{
  updated: [];
}>();

const { loading, save } = useUpdateResource<Todo>('todos');

async function handleClick() {
  try {
    await save(props.todo.id, {
      done_at: props.todo.done_at ? null : new Date().toISOString(),
    });

    emit('updated');
  } catch (err) {}
}
</script>

<template>
  <n-button size="small" :loading="loading" v-on:click="handleClick"
    >Mark as {{ todo.done_at ? 'Todo' : 'Done' }}</n-button
  >
</template>
