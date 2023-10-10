<script setup lang="ts">
import {
  NDataTable,
  DataTableColumn,
  NCheckbox,
  NPageHeader,
  NSpace,
  NText,
} from 'naive-ui';
import { h, reactive } from 'vue';
import TodoCreateDropdown from 'src/modules/todo/components/todo-create-dropdown.vue';
import TodoActionDropdown from 'src/modules/todo/components/todo-action-dropdown.vue';
import TodoEditModal from 'src/modules/todo/components/todo-edit-modal.vue';
import { Todo } from 'src/modules/todo/todo.types';

defineProps<{
  title?: string;
  subtitle?: string;
  withHeader?: boolean;
  withCreate?: boolean;
}>();

const data: Todo[] = [
  {
    id: 1,
    name: 'Beli Bensin',
    isDone: false,
  },
  {
    id: 2,
    name: 'Ganti oli',
    isDone: true,
  },
];

const editModal = reactive<{
  visible: boolean;
  data: Todo | null;
}>({
  visible: false,
  data: null,
});

const columns: DataTableColumn[] = [
  {
    key: 'isDone',
    title: '',
    width: 10,
    render: (rowData: Record<string, any>) =>
      h(NCheckbox, { checked: (rowData as Todo).isDone }),
  },
  {
    key: 'name',
    title: 'Name',
    render: (rowData: Record<string, any>) =>
      h(
        NText,
        { style: { textDecoration: rowData.isDone ? 'line-through' : '' } },
        { default: () => (rowData as Todo).name },
      ),
  },
  {
    key: 'actions',
    title: '',
    align: 'right',
    width: 10,
    render: (rowData: Record<string, any>) =>
      h(TodoActionDropdown, {
        onEdit: () => handleEdit(rowData as Todo),
      }),
  },
];

function handleEdit(todo: Todo) {
  editModal.visible = true;
  editModal.data = todo;
}
</script>

<template>
  <n-space vertical size="large">
    <n-page-header v-if="withHeader" :title="title" :subtitle="subtitle" />
    <n-data-table :columns="columns" :data="data" />
    <todo-create-dropdown v-if="withCreate" />
  </n-space>

  <todo-edit-modal :todo="editModal.data" v-model:visible="editModal.visible" />
</template>
