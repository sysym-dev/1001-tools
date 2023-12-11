<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseHeading from 'src/components/base/base-heading.vue';
import TaskCategoryWidgetList from 'src/modules/task-category/components/task-category-widget-list.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <base-heading title="Categories" />
      <task-category-widget-list />
    </div>

    <div>
      <base-heading title="Today Todo" />
      <task-list :filterable="false" with-see-all />
    </div>
  </div>
</template>
