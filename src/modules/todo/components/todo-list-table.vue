<script setup lang="ts">
import {
  NDataTable,
  DataTableColumn,
  NCheckbox,
  NPageHeader,
  NSpace,
  NText,
  PaginationProps,
} from 'naive-ui';
import { h, reactive, ref } from 'vue';
import TodoQuickCreateDropdown from 'src/modules/todo/components/todo-quick-create-dropdown.vue';
import TodoActionDropdown from 'src/modules/todo/components/todo-action-dropdown.vue';
import TodoEditModal from 'src/modules/todo/components/todo-edit-modal.vue';
import TodoListFilter from 'src/modules/todo/components/todo-list-filter.vue';
import TodoStatusTag from './todo-status-tag.vue';
import { Todo } from 'src/modules/todo/todo.entity';
import { optionalElement } from 'src/utils/array';
import { formatDate } from 'src/utils/date';
import { useTodoResourceCollection } from 'src/modules/todo/composes/todo-resource-collection.compose';
import { computed } from 'vue';
import { LoadResourceCollectionParams } from 'src/common/resource/collection';

const props = defineProps<{
  title?: string;
  subtitle?: string;
  withHeader?: boolean;
  withQuickCreate?: boolean;
  withLateLabel?: boolean;
  withPagination?: boolean;
  withHeaderExtra?: boolean;
  withColumns?: {
    date?: boolean;
    doneCheck?: boolean;
    status?: boolean;
  };
  withLateStrikethrough?: boolean;
}>();

const loadResourceCollectionParams = ref<LoadResourceCollectionParams>({
  page: {
    size: 5,
    number: 1,
  },
  filter: {
    is_done: null,
  },
});

const {
  loading,
  data,
  meta,
  load: loadResourceCollection,
} = useTodoResourceCollection(loadResourceCollectionParams);

const pagination = computed<PaginationProps>(() => {
  return {
    pageSize: meta.value.page.size,
    pageCount: Math.ceil(meta.value.total / meta.value.page.size),
    page: meta.value.page.number,
  };
});

const editModal = reactive<{
  visible: boolean;
  data: Todo | null;
}>({
  visible: false,
  data: null,
});

const columns: DataTableColumn[] = [
  ...optionalElement(props.withColumns?.doneCheck, {
    key: 'done-check',
    title: '',
    width: 10,
    render: (rowData: Record<string, any>) =>
      h(NCheckbox, { checked: !!(rowData as Todo).done_at }),
  }),
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
              {
                delete:
                  props.withLateStrikethrough && !!(rowData as Todo).done_at,
              },
              { default: () => (rowData as Todo).name },
            ),
          ].filter(Boolean),
      }),
  },
  ...optionalElement(props.withColumns?.date, {
    key: 'created-date',
    title: 'Date',
    render: (rowData: Record<string, any>) =>
      h(NText, null, {
        default: () => formatDate((rowData as Todo).created_at),
      }),
  }),
  ...optionalElement(props.withColumns?.status, {
    key: 'status',
    title: 'Status',
    render: (rowData: Record<string, any>) =>
      h(TodoStatusTag, { todo: rowData as Todo }),
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

loadResourceCollection();

function handleChangePage(page: number) {
  if (loadResourceCollectionParams.value.page) {
    loadResourceCollectionParams.value.page.number = page;
  }

  loadResourceCollection();
}
function handleFilter() {
  loadResourceCollection({
    resetPage: true,
  });
}
</script>

<template>
  {{ loadResourceCollectionParams }}
  <n-space vertical size="large">
    <n-page-header v-if="withHeader" :title="title" :subtitle="subtitle">
      <template #extra>
        <todo-list-filter
          v-if="withHeaderExtra"
          v-model:filter="
            loadResourceCollectionParams.filter as Record<string, any>
          "
          v-on:filter="handleFilter"
        />
      </template>
    </n-page-header>
    <n-data-table
      remote
      :loading="loading"
      :columns="columns"
      :data="data"
      :pagination="withPagination ? pagination : false"
      @update-page="handleChangePage"
    />
    <todo-quick-create-dropdown v-if="withQuickCreate" />
  </n-space>
  <todo-edit-modal :todo="editModal.data" v-model:visible="editModal.visible" />
</template>
