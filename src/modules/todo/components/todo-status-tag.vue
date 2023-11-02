<script setup lang="ts">
import { NTag } from 'naive-ui';
import { Todo } from 'src/modules/todo/todo.entity';
import { isGreaterThan } from 'src/utils/date';
import { computed } from 'vue';

const props = defineProps<{
  todo: Todo;
}>();

const type = computed<'success' | 'default' | 'warning'>(() => {
  if (props.todo.done_at) {
    return 'success';
  }

  if (isGreaterThan(new Date(), props.todo.due_at)) {
    return 'warning';
  }

  return 'default';
});
const text = computed<'done' | 'todo' | 'late'>(() => {
  if (props.todo.done_at) {
    return 'done';
  }

  if (isGreaterThan(new Date(), props.todo.due_at)) {
    return 'late';
  }

  return 'todo';
});
</script>

<template>
  <n-tag :type="type">{{ text }}</n-tag>
</template>
