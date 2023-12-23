<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import WithState from 'src/components/composes/with-state.vue';
import { inject, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
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

const router = useRouter();
const {
  isError,
  error,
  request,
  data: taskCategories,
} = useRequest('/task-categories');

const loading = reactive({
  type: 'page',
  visible: false,
});
const deleteConfirm = reactive({
  id: null,
  visible: false,
});
const page = reactive({
  number: 1,
  size: props.pageSize,
});
const filter = reactive({
  search: null,
});

const actionOptions = [
  {
    id: 'setting',
    name: 'Setting',
  },
  {
    id: 'delete',
    name: 'Delete',
  },
];

function startLoading(type) {
  loading.type = type;
  loading.visible = true;
}
function stopLoading() {
  loading.type = null;
  loading.visible = false;
}
async function loadTaskCategories() {
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
    startLoading('page');

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}

function handleClickOption(item, option) {
  if (option.id === 'setting') {
    router.push({
      name: 'task-categories.detail',
      params: { id: '1' },
      query: { tab: 'setting' },
    });
  } else if (option.id === 'delete') {
    deleteConfirm.visible = true;
    deleteConfirm.id = item.id;
  }
}
function handleClickItem(item) {
  router.push({
    name: 'task-categories.detail',
    params: { id: item.id },
  });
}
async function handleLoadMore() {
  try {
    startLoading('load-more');

    page.size += props.pageSize;

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}
async function handleSearch() {
  try {
    startLoading('filter');

    page.size = props.pageSize;

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}
async function handleRefresh() {
  try {
    startLoading('filter');

    filter.search = null;
    page.size = props.pageSize;

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}

emitter.on('task-categories-created', () => handleRefresh());
emitter.on('task-categories-deleted', () => handleRefresh());

init();
</script>

<template>
  <with-state
    class="space-y-5"
    :loading="loading.type === 'page' && loading.visible"
    :error="isError"
    :error-message="isError ? error.message : null"
  >
    <base-input
      :with-label="false"
      placeholder="Search"
      width="full"
      v-model="filter.search"
      v-on:debounce-input="handleSearch"
    />
    <base-stacked-list
      :data="taskCategories.data.rows"
      :loading="loading.type !== 'page' && loading.visible"
      :loading-position="loading.type === 'filter' ? 'top' : 'bottom'"
      v-on:click-detail="handleClickItem"
    >
      <template #description="{ item }">
        {{ item.tasks_done_count }} / {{ item.tasks_count }} Completed
      </template>
      <template #actions="{ item }">
        <base-dropdown
          :options="actionOptions"
          position="right"
          v-on:click-option="(option) => handleClickOption(item, option)"
        >
          <template #toggle="{ toggle }">
            <base-button
              color="transparent-white"
              size="square-md"
              v-on:click="toggle"
            >
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </base-button>
          </template>
        </base-dropdown>
      </template>
    </base-stacked-list>
    <base-button
      v-if="page.size < taskCategories.data.meta.count && !loading.visible"
      fullwidth
      v-on:click="handleLoadMore"
      >Load More</base-button
    >
    <task-category-delete-confirm
      :task-category-id="deleteConfirm.id"
      v-model:visible="deleteConfirm.visible"
    />
  </with-state>
</template>
