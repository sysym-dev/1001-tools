<script setup lang="ts">
import {
  NDataTable,
  DataTableColumn,
  NCheckbox,
  NPageHeader,
  NSpace,
  NText,
  PaginationProps,
  NTag,
} from 'naive-ui';
import { h, reactive, ref } from 'vue';
import TodoQuickCreateDropdown from 'src/modules/todo/components/todo-quick-create-dropdown.vue';
import TodoActionDropdown from 'src/modules/todo/components/todo-action-dropdown.vue';
import TodoEditModal from 'src/modules/todo/components/todo-edit-modal.vue';
import TodoListFilter from 'src/modules/todo/components/todo-list-filter.vue';
import TodoStatusTag from './todo-status-tag.vue';
import { Todo } from 'src/modules/todo/todo.entity';
import { optionalElement } from 'src/utils/array';
import { fromDate, parseDate } from 'src/utils/date';
import { computed } from 'vue';
import {
  LoadResourceCollectionOptions,
  LoadResourceCollectionParams,
} from 'src/common/resource/collection';
import { useResourceCollection } from 'src/common/resource/composes/resource-collection.compose';
import { isLate } from '../todo.util';
import { hasOwnProperty } from 'src/utils/object';
import TodoStatusQuickAction from './todo-status-quick-action.vue';

const props = defineProps<{
  title?: string;
  subtitle?: string;
  withHeader?: boolean;
  withQuickCreate?: boolean;
  withLateLabel?: boolean;
  withPagination?: boolean;
  withHeaderExtra?: boolean;
  withLateTag?: boolean;
  withCreate?: boolean;
  withColumns?: {
    due_at?: boolean;
    doneCheck?: boolean;
    status?: boolean;
  };
  withLateStrikethrough?: boolean;
  withFilter?: boolean;
  withFilterStatus?: boolean;
  filter?: Record<string, any>;
  withStatusQuickAction?: boolean;
}>();

const loadResourceCollectionParams = ref<LoadResourceCollectionParams>({
  page: {
    size: 5,
    number: 1,
  },
  filter: {
    is_done: null,
    due_at_from: null,
    due_at_to: null,
    search: null,
    done_at_from: null,
    done_at_to: null,
    is_late: null,
  },
  sort: '-created_at',
});

const {
  loading,
  data,
  meta,
  load: loadResourceCollection,
} = useResourceCollection('todos', loadResourceCollectionParams);

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
              h(
                NText,
                { type: 'error' },
                { default: () => parseDate(rowData.due_at).fromNow() },
              ),
            h(
              NText,
              {
                delete:
                  props.withLateStrikethrough && !!(rowData as Todo).done_at,
              },
              { default: () => (rowData as Todo).name },
            ),
            props.withLateTag &&
              isLate(rowData as Todo) &&
              h(NTag, { size: 'small', type: 'error' }, () => 'Late'),
          ].filter(Boolean),
      }),
  },
  ...optionalElement(props.withColumns?.due_at, {
    key: 'due-at',
    title: 'Due At',
    render: (rowData: Record<string, any>) =>
      h(NText, null, {
        default: () => fromDate((rowData as Todo).due_at),
      }),
  }),
  ...optionalElement(props.withColumns?.status, {
    key: 'status',
    title: 'Status',
    render: (rowData: Record<string, any>) =>
      h(TodoStatusTag, {
        todo: rowData as Todo,
        onUpdated: () => handleRefresh(),
      }),
  }),
  {
    key: 'actions',
    title: '',
    align: 'right',
    render: (rowData: Record<string, any>) =>
      h(
        NSpace,
        { align: 'center', justify: 'end' },
        {
          default: () => [
            props.withStatusQuickAction &&
              h(TodoStatusQuickAction, {
                todo: rowData as Todo,
                onUpdated: () => handleRefresh(),
              }),
            h(TodoActionDropdown, {
              todo: rowData as Todo,
              onEdit: () => handleEdit(rowData as Todo),
              onDeleted: () => handleRefresh(),
            }),
          ],
        },
      ),
  },
];

function setFilterFromProps() {
  if (props.filter) {
    if (loadResourceCollectionParams.value.filter) {
      if (hasOwnProperty(props.filter, 'is_late')) {
        loadResourceCollectionParams.value.filter.is_late =
          props.filter.is_late;
      }

      if (hasOwnProperty(props.filter, 'due_at_from')) {
        loadResourceCollectionParams.value.filter.due_at_from =
          props.filter.due_at_from;
      }

      if (hasOwnProperty(props.filter, 'due_at_to')) {
        loadResourceCollectionParams.value.filter.due_at_to =
          props.filter.due_at_to;
      }

      if (hasOwnProperty(props.filter, 'is_done')) {
        loadResourceCollectionParams.value.filter.is_done =
          props.filter.is_done;
      }
    }
  }
}

function handleEdit(todo: Todo) {
  editModal.visible = true;
  editModal.data = todo;
}
async function load(params?: LoadResourceCollectionOptions) {
  try {
    await loadResourceCollection(params);
  } catch (err) {}
}

function handleChangePage(page: number) {
  if (loadResourceCollectionParams.value.page) {
    loadResourceCollectionParams.value.page.number = page;
  }

  load();
}
function handleReload() {
  load({
    resetPage: true,
  });
}
function handleRefresh() {
  if (loadResourceCollectionParams.value.filter) {
    loadResourceCollectionParams.value.filter.is_done = null;
    loadResourceCollectionParams.value.filter.due_at_from = null;
    loadResourceCollectionParams.value.filter.due_at_to = null;
    loadResourceCollectionParams.value.filter.search = null;
    loadResourceCollectionParams.value.filter.done_at_from = null;
    loadResourceCollectionParams.value.filter.done_at_to = null;
    loadResourceCollectionParams.value.filter.is_late = null;

    setFilterFromProps();
  }

  loadResourceCollectionParams.value.sort = '-created_at';

  load({
    resetPage: true,
  });
}

setFilterFromProps();
load();
</script>

<template>
  <n-space vertical size="large">
    <n-page-header v-if="withHeader" :title="title" :subtitle="subtitle">
      <template #extra>
        <todo-list-filter
          v-if="withHeaderExtra"
          :with-create="withCreate"
          :with-filter="withFilter"
          :with-filter-status="withFilterStatus"
          v-model:filter="
            loadResourceCollectionParams.filter as Record<string, any>
          "
          v-model:sort="loadResourceCollectionParams.sort as string"
          v-on:filter="handleReload"
          v-on:sort="handleReload"
          v-on:created="handleRefresh"
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
  <todo-edit-modal
    :todo="editModal.data"
    v-model:visible="editModal.visible"
    v-on:updated="handleRefresh"
  />
</template>
