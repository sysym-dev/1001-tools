<script setup lang="ts">
import { NTag, NDropdown, DropdownOption, NIcon } from 'naive-ui';
import { Todo } from 'src/modules/todo/todo.entity';
import { computed } from 'vue';
import { ChevronDown12Regular } from '@vicons/fluent';
import { useUpdateResource } from 'src/common/resource/composes/update-resource.compose';

const props = defineProps<{
  todo: Todo;
}>();
const emit = defineEmits<{
  updated: [];
}>();

const { loading, save } = useUpdateResource<Todo>('todos');

const type = computed<'success' | 'default' | 'warning'>(() => {
  if (props.todo.done_at) {
    return 'success';
  }

  return 'default';
});
const text = computed<'done' | 'todo' | 'late'>(() => {
  if (props.todo.done_at) {
    return 'done';
  }

  return 'todo';
});

const statusOptions: DropdownOption[] = [
  {
    key: 'todo',
    label: 'Todo',
  },
  {
    key: 'done',
    label: 'Done',
  },
];

async function updateTodoStatus(done: boolean) {
  try {
    await save(props.todo.id, {
      done_at: done ? new Date().toISOString() : null,
    });

    handleSuccess();
  } catch (err) {}
}

async function handleChange(key: string) {
  await updateTodoStatus(key === 'done');
}
function handleSuccess() {
  emit('updated');
}
</script>

<template>
  <n-dropdown
    :options="statusOptions"
    placement="bottom-end"
    trigger="click"
    size="small"
    v-on:select="handleChange"
  >
    <n-tag :disabled="loading" :type="type" class="todo-status">
      <span>{{ text }}</span>
      <n-icon>
        <ChevronDown12Regular />
      </n-icon>
    </n-tag>
  </n-dropdown>
</template>

<style>
.todo-status .n-tag__content {
  display: flex;
  column-gap: 4px;
  align-items: center;
}
</style>
