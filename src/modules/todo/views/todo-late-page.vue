<script setup lang="ts">
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
</script>

<template>
  <todo-list-table
    title="Late Todo"
    :with-quick-create="false"
    with-header
    with-header-extra
    with-late-label
    with-pagination
    :filter="{
      is_late: true,
    }"
  />
</template>
