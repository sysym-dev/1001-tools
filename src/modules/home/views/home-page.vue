<script setup>
import TaskCategoryWidgetList from 'src/modules/task-category/components/task-category-widget-list.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
</script>

<template>
  <div class="space-y-8">
    <task-category-widget-list />

    <task-list />
  </div>
</template>
