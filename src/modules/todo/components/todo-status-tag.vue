<script setup lang="ts">
import { NTag } from 'naive-ui';
import { Todo } from 'src/modules/todo/todo.entity';
import { computed } from 'vue';

const props = defineProps<{
  todo: Todo;
}>();

const type = computed<'success' | 'default'>(() => {
  if (props.todo.done_at) {
    return 'success';
  }

  return 'default';
});
const text = computed<'done' | 'todo'>(() => {
  if (props.todo.done_at) {
    return 'done';
  }

  return 'todo';
});
</script>

<template>
  <n-tag :type="type">{{ text }}</n-tag>
</template>
