<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskDetailModal from './task-detail-modal.vue';
import TaskStatusCheckboxDropdown from './task-status-checkbox-dropdown.vue';
import WithState from 'src/components/composes/with-state.vue';
import { ref, reactive, inject } from 'vue';
import { useRequest } from 'src/composes/request.compose';
import { useLoading } from 'src/composes/loading.compose';

const props = defineProps({
  filterable: {
    type: Boolean,
    default: true,
  },
  withSeeAll: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  sortColumn: {
    type: String,
    default: 'id',
  },
  sortDirection: {
    type: String,
    default: 'asc',
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
  number: 1,
  size: props.pageSize,
});
const filter = reactive({
  search: null,
  status_in: ['todo', 'in-progress'],
});

const visibleDetailModal = ref(false);

async function loadTasks() {
  try {
    await request({
      params: {
        page,
        filter,
        sort: {
          column: props.sortColumn,
          direction: props.sortDirection,
        },
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

    page.size += props.pageSize;

    await loadTasks();
  } finally {
    stopLoading();
  }
}
async function handleFilter() {
  try {
    startLoading('alert-before-content');

    page.size = props.pageSize;

    await loadTasks();
  } finally {
    stopLoading();
  }
}
async function handleRefresh() {
  try {
    startLoading('alert-before-content');

    filter.search = null;
    page.size = props.pageSize;

    await loadTasks();
  } finally {
    stopLoading();
  }
}
function handleClickDetail() {
  visibleDetailModal.value = true;
}

emitter.on('tasks-created', () => handleRefresh());
emitter.on('tasks-deleted', () => handleRefresh());

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
        v-on:click-detail="handleClickDetail"
      >
        <template #description>
          Due on <time datetime="2023-03-17T00:00Z">today</time>
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
        v-if="page.size < tasks.data.meta.count"
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
      <task-detail-modal v-model:visible="visibleDetailModal" />
    </with-state>
  </div>
</template>
