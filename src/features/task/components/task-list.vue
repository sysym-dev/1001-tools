<script setup>
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseStackedList from 'src/core/components/base/base-stacked-list.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskDetailModal from './task-detail-modal.vue';
import TaskStatusCheckboxDropdown from './task-status-checkbox-dropdown.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { reactive, inject } from 'vue';
import { useRequest } from 'src/core/request/request.compose';
import { useLoading } from 'src/core/composes/loading.compose';
import { date } from 'src/core/utils/date';

const props = defineProps({
  filterable: {
    type: Boolean,
    default: true,
  },
  withSeeAll: {
    type: Boolean,
    default: false,
  },
  withLoadMore: {
    type: Boolean,
    default: true,
  },
  sort: {
    type: Object,
    default: () => ({}),
  },
  filter: {
    type: Object,
    default: () => ({}),
  },
  page: {
    type: Object,
    default: () => ({}),
  },
  editElements: {
    type: Object,
    default: () => ({}),
  },
  elements: {
    type: Object,
    default: () => ({}),
  },
});
const emitter = inject('emitter');

const {
  isError,
  error,
  request,
  data: tasks,
} = useRequest('/tasks', {
  initData: {
    data: {
      rows: [],
      meta: {
        count: 0,
      },
    },
  },
});
const { loading, startLoading, stopLoading } = useLoading({
  initType: 'skeleton',
  initVisible: false,
});

const page = reactive({
  number: props.page.number ?? 1,
  size: props.page.size ?? 5,
});
const filter = reactive({
  search: null,
  status_in: props.filter.status_in ?? ['todo', 'in-progress'],
  status: props.filter.status ?? null,
  task_category_id: props.filter.task_category_id ?? null,
  due_at_from: props.filter.due_at_from ?? null,
  due_at_to: props.filter.due_at_to ?? null,
});

const detailModal = reactive({
  visible: false,
  id: null,
});

function setFilterFromProps() {
  filter.search = null;
  filter.status_in = props.filter.status_in ?? ['todo', 'in-progress'];
  filter.status = props.filter.status ?? null;
  filter.task_category_id = props.filter.task_category_id ?? null;
}
async function loadTasks() {
  try {
    await request({
      params: {
        page,
        filter,
        sort: {
          column: props.sortColumn ?? 'id',
          direction: props.sortDirection ?? 'asc',
        },
        include: ['taskCategory'],
      },
    });
  } catch (err) {
    //
  }
}
async function init() {
  try {
    startLoading('skeleton');

    await loadTasks();
  } finally {
    stopLoading();
  }
}

async function handleLoadMore() {
  try {
    startLoading('alert-after-content');

    page.size += props.page.size ?? 5;

    await loadTasks();
  } finally {
    stopLoading();
  }
}
async function handleFilter() {
  try {
    startLoading('alert-before-content');

    page.size = props.page.size ?? 5;

    await loadTasks();
  } finally {
    stopLoading();
  }
}
async function handleRefresh() {
  try {
    startLoading('alert-before-content');

    setFilterFromProps();
    page.size = props.page.size ?? 5;

    await loadTasks();
  } finally {
    stopLoading();
  }
}
function handleClickDetail(task) {
  detailModal.id = task.id;
  detailModal.visible = true;
}

emitter.on('tasks-created', () => handleRefresh());
emitter.on('tasks-updated', () => handleRefresh());
emitter.on('tasks-deleted', () => handleRefresh());

setFilterFromProps();
init();
</script>

<template>
  <div class="space-y-5">
    <div
      v-if="filterable"
      class="flex flex-col items-start gap-2 justify-between sm:flex-row"
    >
      <div class="w-full sm:w-auto">
        <task-status-checkbox-dropdown
          v-model="filter.status_in"
          v-on:change="handleFilter"
        />
      </div>
      <div class="w-full sm:w-auto">
        <base-input
          :with-label="false"
          placeholder="Search"
          width="full"
          size="sm"
          v-model="filter.search"
          v-on:debounce-input="handleFilter"
        />
      </div>
    </div>
    <with-state
      :loading-type="loading.type"
      :is-loading="loading.visible"
      :is-loading-blocking="loading.type === 'skeleton'"
      :is-error="isError"
      :is-empty="tasks.data.meta.count < 1"
      :error-message="isError ? error.message : null"
    >
      <base-stacked-list
        :data="tasks.data.rows"
        :with-description-end="elements.category !== false"
        v-on:click-detail="handleClickDetail"
      >
        <template #description="{ item }">
          <template v-if="item.due_at"
            >Due
            <time :datetime="item.due_at">{{
              date(item.due_at).fromNow()
            }}</time></template
          >
          <template v-else>No Due</template>
        </template>
        <template #description-end="{ item }">
          {{ item.taskCategory.name }}
        </template>
        <template #actions="{ index }">
          <div>
            <task-status-dropdown
              :task-id="tasks.data.rows[index].id"
              v-model="tasks.data.rows[index].status"
            />
          </div>
        </template>
      </base-stacked-list>
      <base-button
        v-if="withLoadMore && page.size < tasks.data.meta.count"
        v-on:click="handleLoadMore"
        fullwidth
        >Load More</base-button
      >
      <base-button
        v-if="withSeeAll"
        fullwidth
        router-link
        :to="{ name: 'tasks.index' }"
        >See All</base-button
      >
      <task-detail-modal
        :task-id="detailModal.id"
        :edit-elements="editElements"
        v-model:visible="detailModal.visible"
      />
    </with-state>
  </div>
</template>
