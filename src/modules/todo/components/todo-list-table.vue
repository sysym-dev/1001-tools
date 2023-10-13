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
import TodoQuickCreateDropdown from 'src/modules/todo/components/todo-quick-create-dropdown.vue';
import TodoActionDropdown from 'src/modules/todo/components/todo-action-dropdown.vue';
import TodoEditModal from 'src/modules/todo/components/todo-edit-modal.vue';
import TodoListFilter from 'src/modules/todo/components/todo-list-filter.vue';
import { Todo } from 'src/modules/todo/todo.types';
import { optionalElement } from 'src/utils/array';
import { formatDate } from 'src/utils/date';

const props = defineProps<{
  title?: string;
  subtitle?: string;
  withHeader?: boolean;
  withQuickCreate?: boolean;
  withLateLabel?: boolean;
  withColumns?: {
    date?: boolean;
  };
}>();

const data: Todo[] = [
  {
    id: 1,
    name: 'Beli Bensin',
    isDone: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Ganti oli',
    isDone: true,
    createdAt: new Date(),
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
      h(NSpace, null, {
        default: () =>
          [
            props.withLateLabel &&
              h(NText, { type: 'error' }, { default: () => '2 days ago' }),
            h(
              NText,
              { delete: rowData.isDone },
              { default: () => (rowData as Todo).name },
            ),
          ].filter(Boolean),
      }),
  },
  ...optionalElement(props.withColumns?.date, {
    key: 'createdAt',
    title: 'Date',
    render: (rowData: Record<string, any>) =>
      h(NText, null, {
        default: () => formatDate((rowData as Todo).createdAt),
      }),
  }),
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
    <n-page-header v-if="withHeader" :title="title" :subtitle="subtitle">
      <template #extra>
        <todo-list-filter />
      </template>
    </n-page-header>
    <n-data-table :columns="columns" :data="data" />
    <todo-quick-create-dropdown v-if="withQuickCreate" />
  </n-space>

  <todo-edit-modal :todo="editModal.data" v-model:visible="editModal.visible" />
</template>
