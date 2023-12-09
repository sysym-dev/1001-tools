<script setup>
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';

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
</script>

<template>
  <base-stacked-list :data="taskCategories">
    <template #description="{ item }">
      {{ item.tasksDoneCount }} / {{ item.tasksCount }} Completed
    </template>
    <template #actions>
      <base-dropdown :options="actionOptions">
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
</template>
