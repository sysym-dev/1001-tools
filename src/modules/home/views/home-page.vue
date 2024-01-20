<script setup>
import BaseHeading from 'src/core/components/base/base-heading.vue';
import TaskCategoryWidgetList from 'src/modules/task-category/components/task-category-widget-list.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
import { createDate } from 'src/utils/date';
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

    <div class="space-y-5">
      <base-heading title="Task Today" />
      <task-list
        :filterable="false"
        :page="{
          size: 4,
        }"
        :filter="{
          status_in: ['todo', 'in-progress'],
          due_at_from: createDate().startOf('d'),
          due_at_to: createDate().endOf('d'),
        }"
        with-see-all
        :with-load-more="false"
      />
    </div>
  </div>
</template>
