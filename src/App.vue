<script setup>
import BaseButton from './components/base/base-button.vue';

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
</script>

<template>
  <div class="px-4 py-8 sm:py-12 space-y-4 container">
    <div class="flex items-center justify-between">
      <h1 class="font-bold leading-6 text-xl text-gray-900">Categories</h1>
      <base-button color="sky">New</base-button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="category in taskCategories"
        :key="category.id"
        href="#"
        class="flex flex-col ring-1 ring-inset ring-gray-300 rounded-md px-4 py-3 hover:bg-gray-50"
      >
        <span class="text-base font-semibold text-gray-900 leading-7">{{
          category.name
        }}</span>
        <span class="text-sm leading-6 text-gray-500"
          >{{ category.tasksDoneCount }} /
          {{ category.tasksCount }} completed</span
        >
      </a>
    </div>
    <base-button fullwidth>See All</base-button>
  </div>
</template>
