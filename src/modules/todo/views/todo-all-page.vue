<script setup lang="ts">
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
</script>

<template>
  <todo-list-table
    title="Late Todo"
    with-header
    :with-columns="{
      date: true,
    }"
  />
</template>
