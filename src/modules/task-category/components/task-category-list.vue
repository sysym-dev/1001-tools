<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import WithState from 'src/components/composes/with-state.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRequest } from 'src/composes/request.compose';

const router = useRouter();
const {
  isLoading,
  isError,
  error,
  request,
  data: taskCategories,
} = useRequest('/task-categories');

const visibleDeleteConfirm = ref(false);
const loading = ref(false);

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
        page: {
          size: 4,
        },
      },
    });
  } catch (err) {
    //
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

loadTaskCategories();
</script>

<template>
  <with-state
    :loading="isLoading"
    :error="isError"
    :error-message="isError ? error.message : null"
  >
    <div :class="[loading && 'space-y-5']">
      <base-input :with-label="false" placeholder="Search" width="full" />
      <div>
        <base-stacked-list
          :data="taskCategories.data.rows"
          :loading="loading"
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
      </div>
      <base-button fullwidth :loading="false" :disabled="false" block-loading
        >Load More (+25)</base-button
      >
    </div>
    <task-category-delete-confirm v-model:visible="visibleDeleteConfirm" />
  </with-state>
</template>
