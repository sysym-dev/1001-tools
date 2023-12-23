<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import WithState from 'src/components/composes/with-state.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
  pageSize: {
    type: Number,
    default: 5,
  },
});

const router = useRouter();
const {
  isLoading,
  isError,
  error,
  request,
  data: taskCategories,
} = useRequest('/task-categories');

const isLoadingPage = ref(true);
const visibleDeleteConfirm = ref(false);
const page = reactive({
  number: 1,
  size: props.pageSize,
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
      },
    });
  } catch (err) {
    //
  }
}
async function init() {
  try {
    isLoadingPage.value = true;

    await loadTaskCategories();
  } finally {
    isLoadingPage.value = false;
  }
}

function handleClickOption(option) {
  if (option.id === 'setting') {
    router.push({
      name: 'task-categories.detail',
      params: { id: '1' },
      query: { tab: 'setting' },
    });
  } else if (option.id === 'delete') {
    visibleDeleteConfirm.value = true;
  }
}
function handleClickItem(item) {
  router.push({
    name: 'task-categories.detail',
    params: { id: item.id },
  });
}
function handleLoadMore() {
  page.size += props.pageSize;

  loadTaskCategories();
}

init();
</script>

<template>
  <with-state
    class="space-y-5"
    :loading="isLoadingPage"
    :error="isError"
    :error-message="isError ? error.message : null"
  >
    <base-input :with-label="false" placeholder="Search" width="full" />
    <base-stacked-list
      :data="taskCategories.data.rows"
      :loading="isLoading"
      loading-position="bottom"
      v-on:click-detail="handleClickItem"
    >
      <template #description="{ item }">
        {{ item.tasks_done_count }} / {{ item.tasks_count }} Completed
      </template>
      <template #actions>
        <base-dropdown
          :options="actionOptions"
          position="right"
          v-on:click-option="handleClickOption"
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
      v-if="page.size < taskCategories.data.meta.count && !isLoading"
      fullwidth
      v-on:click="handleLoadMore"
      >Load More</base-button
    >
    <task-category-delete-confirm v-model:visible="visibleDeleteConfirm" />
  </with-state>
</template>
