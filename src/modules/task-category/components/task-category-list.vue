<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const visibleDeleteConfirm = ref(false);

const taskCategories = [
  {
    id: 1,
    name: 'Shopping List',
    tasksCount: 10,
    tasksDoneCount: 2,
  },
  {
    id: 2,
    name: 'College Task',
    tasksCount: 4,
    tasksDoneCount: 4,
  },
  {
    id: 3,
    name: 'Project Ideas',
    tasksCount: 5,
    tasksDoneCount: 3,
  },
  {
    id: 4,
    name: 'Article Ideas',
    tasksCount: 15,
    tasksDoneCount: 8,
  },
];
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
</script>

<template>
  <base-input :with-label="false" placeholder="Search" width="full" />
  <base-stacked-list :data="taskCategories" v-on:click-detail="handleClickItem">
    <template #description="{ item }">
      {{ item.tasksDoneCount }} / {{ item.tasksCount }} Completed
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
  <base-button fullwidth :loading="false" :disabled="false" block-loading
    >Load More (+25)</base-button
  >
  <task-category-delete-confirm v-model:visible="visibleDeleteConfirm" />
</template>
