<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseHeading from 'src/components/base/base-heading.vue';
import TaskCategoryWidgetList from 'src/modules/task-category/components/task-category-widget-list.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <base-heading title="Top Categories" />
      <task-category-widget-list />
    </div>

    <div class="space-y-5">
      <base-heading title="Task In Progress" />
      <task-list
        :filterable="false"
        :page="{
          size: 4,
        }"
        :filter="{
          status: 'in-progress',
          status_in: [],
        }"
        with-see-all
        :with-load-more="false"
      />
    </div>
  </div>
</template>
