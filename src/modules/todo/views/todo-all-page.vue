<script setup lang="ts">
import { NCard } from 'naive-ui';
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
</script>

<template>
  <n-card>
    <todo-list-table
      title="All Todo"
      with-header
      with-header-extra
      with-pagination
      with-late-tag
      with-create
      with-filter
      with-filter-status
      :with-columns="{
        due_at: true,
        status: true,
      }"
    />
  </n-card>
</template>
