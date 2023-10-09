<script setup lang="ts">
import {
  NDataTable,
  DataTableColumn,
  NCheckbox,
  NPageHeader,
  NSpace,
  NButton,
  NIcon,
} from 'naive-ui';
import { MoreHorizontal16Regular, Add12Regular } from '@vicons/fluent';
import { h } from 'vue';

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
    render: () =>
      h(
        NButton,
        { quaternary: true, size: 'small' },
        {
          icon: () =>
            h(NIcon, null, { default: () => h(MoreHorizontal16Regular) }),
        },
      ),
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
    <n-button text type="primary">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New Todo
    </n-button>
  </n-space>
</template>
