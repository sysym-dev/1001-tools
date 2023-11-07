<script setup lang="ts">
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
</script>

<template>
  <todo-list-table
    title="All Todo"
    with-header
    with-header-extra
    with-pagination
    with-late-tag
    with-create
    :with-columns="{
      due_at: true,
      status: true,
    }"
  />
</template>
