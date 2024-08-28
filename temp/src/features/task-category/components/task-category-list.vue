<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseDropdown from 'src/core/components/base/base-dropdown.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseStackedList from 'src/core/components/base/base-stacked-list.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { inject, onMounted, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRequest } from 'src/core/request/request.compose';
import { useLoading } from 'src/core/composes/loading.compose';

const props = defineProps({
  page: {
    type: Object,
    default: () => ({}),
  },
  sort: {
    type: Object,
    default: () => ({}),
  },
});
const emitter = inject('emitter');

const router = useRouter();
const {
  isError,
  error,
  request,
  data: taskCategories,
} = useRequest('/task-categories', {
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

const deleteConfirm = reactive({
  id: null,
  visible: false,
});
const page = reactive({
  number: props.page.number ?? 1,
  size: props.page.size ?? 5,
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

async function loadTaskCategories() {
  try {
    await request({
      params: {
        page,
        filter,
        sort: {
          column: props.sort.dolumn ?? 'id',
          direction: props.sort.direction ?? 'desc',
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

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}

function handleClickOption(item, option) {
  if (option.id === 'setting') {
    router.push({
      name: 'task-categories.detail',
      params: { id: item.id },
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
    startLoading('alert-after-content');

    page.size += props.page.size ?? 5;

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}
async function handleSearch() {
  try {
    startLoading('alert-before-content');

    page.size = props.page.size ?? 5;

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}
async function handleRefresh() {
  try {
    startLoading('alert-before-content');

    filter.search = null;
    page.size = props.page.size ?? 5;

    await loadTaskCategories();
  } finally {
    stopLoading();
  }
}

onMounted(() => {
  emitter.on('task-categories-created', () => handleRefresh());
  emitter.on('task-categories-deleted', () => handleRefresh());
});
onUnmounted(() => {
  emitter.off('task-categories-created');
  emitter.off('task-categories-deleted');
});

init();
</script>

<template>
  <div class="space-y-5">
    <base-input
      :with-label="false"
      placeholder="Search"
      width="full"
      v-model="filter.search"
      v-on:debounce-input="handleSearch"
    />
    <with-state
      :loading-type="loading.type"
      :is-loading="loading.visible"
      :is-loading-blocking="loading.type === 'skeleton'"
      :is-error="isError"
      :is-empty="taskCategories.data.meta.count < 1"
      :error-message="isError ? error.message : null"
    >
      <base-stacked-list
        :data="taskCategories.data.rows"
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
  </div>
</template>
