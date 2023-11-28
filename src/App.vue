<script setup>
import TaskCategoryWidgetList from './modules/task-category/components/task-category-widget-list.vue';
import TaskList from './modules/task/components/task-list.vue';
</script>

<template>
  <div class="px-4 py-8 sm:py-12 container space-y-8">
    <task-category-widget-list />

    <task-list />
  </div>
</template>
