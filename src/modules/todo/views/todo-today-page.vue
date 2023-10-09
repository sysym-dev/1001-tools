<script setup lang="ts">
import {
  NDataTable,
  DataTableColumn,
  NCheckbox,
  NPageHeader,
  NSpace,
} from 'naive-ui';
import { h } from 'vue';
import TodoCreateDropdown from 'src/modules/todo/components/todo-create-dropdown.vue';
import TodoActionDropdown from 'src/modules/todo/components/todo-action-dropdown.vue';

interface Todo {
  name: string;
}

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
  },
  {
    key: 'actions',
    title: '',
    align: 'right',
    render: () => h(TodoActionDropdown),
  },
];
const data: Todo[] = [
  {
    name: 'Beli Bensin',
  },
];
</script>

<template>
  <n-space vertical size="large">
    <n-page-header title="Today Todo" subtitle="22 Mei 2023" />
    <n-data-table :columns="columns" :data="data" />
    <todo-create-dropdown />
  </n-space>
</template>
