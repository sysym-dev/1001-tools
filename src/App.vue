<script setup>
import BaseButton from './components/base/base-button.vue';
import BaseWidget from './components/base/base-widget.vue';
import BaseHeading from './components/base/base-heading.vue';

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
    <base-heading title="Categories">
      <template #actions>
        <base-button color="sky">New</base-button>
      </template>
    </base-heading>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <base-widget
        v-for="category in taskCategories"
        :key="category.id"
        tag="a"
        href="#"
        :title="category.name"
        :value="`${category.tasksDoneCount} / ${category.tasksCount} completed`"
      />
    </div>
    <base-button fullwidth>See All</base-button>
  </div>
</template>
