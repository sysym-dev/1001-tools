<script setup lang="ts">
import {
  NDataTable,
  DataTableColumn,
  NCheckbox,
  NPageHeader,
  NSpace,
  NInput,
  NText,
} from 'naive-ui';
import { h, ref } from 'vue';
import TodoCreateDropdown from 'src/modules/todo/components/todo-create-dropdown.vue';
import TodoActionDropdown from 'src/modules/todo/components/todo-action-dropdown.vue';

interface Todo {
  id: number;
  name: string;
}

const data: Todo[] = [
  {
    id: 1,
    name: 'Beli Bensin',
  },
];
const editingIds = ref<Todo['id'][]>([]);
const columns: DataTableColumn[] = [
  {
    key: 'isDone',
    title: '',
    width: 10,
    render: () => h(NCheckbox),
  },
  {
    key: 'name',
    title: 'Name',
    render: (rowData: Record<string, any>, index: number) => {
      if (editingIds.value.includes(rowData.id)) {
        return h(NInput, {
          value: data[index].name,
        });
      }

      return h(NText, null, {
        default: () => rowData.name,
      });
    },
  },
  {
    key: 'actions',
    title: '',
    align: 'right',
    width: 10,
    render: (rowData: Record<string, any>) =>
      h(TodoActionDropdown, { onEdit: () => handleEdit(rowData as Todo) }),
  },
];

function handleEdit(todo: Todo) {
  editingIds.value.push(todo.id);
}
</script>

<template>
  <n-space vertical size="large">
    <n-page-header title="Today Todo" subtitle="22 Mei 2023" />
    <n-data-table :columns="columns" :data="data" />
    <todo-create-dropdown />
  </n-space>
</template>
