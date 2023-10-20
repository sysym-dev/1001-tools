<script setup lang="ts">
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
</script>

<template>
  <todo-list-table
    title="All Todo"
    with-header
    with-header-extra
    with-pagination
    :with-columns="{
      date: true,
    }"
  />
</template>
