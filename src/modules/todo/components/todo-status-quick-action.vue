<script setup lang="ts">
import { NButton } from 'naive-ui';
import { Todo } from 'src/modules/todo/todo.entity';
import { useUpdateResource } from 'src/common/resource/composes/update-resource.compose';
import { inject } from 'vue';
import { Emitter } from 'mitt';

const props = defineProps<{
  todo: Todo;
}>();
const emit = defineEmits<{
  updated: [];
}>();

const emitter = inject('emitter') as Emitter<{
  'todo-updated': any;
}>;
const { loading, save } = useUpdateResource<Todo>('todos');

async function handleClick() {
  try {
    await save(props.todo.id, {
      done_at: props.todo.done_at ? null : new Date().toISOString(),
    });

    emit('updated');
    emitter.emit('todo-updated', null);
  } catch (err) {}
}
</script>

<template>
  <n-button size="small" :loading="loading" v-on:click="handleClick"
    >Mark as {{ todo.done_at ? 'Todo' : 'Done' }}</n-button
  >
</template>
