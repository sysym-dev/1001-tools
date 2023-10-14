<script setup lang="ts">
import { NSpace, NCollapse, NCollapseItem, NPageHeader } from 'naive-ui';
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
</script>

<template>
  <n-space vertical :size="[0, 16]">
    <todo-list-table
      title="Today"
      subtitle="22 Mei 2023"
      with-quick-create
      with-header
    />

    <n-collapse display-directive="show">
      <n-collapse-item title="Done">
        <template #header>
          <n-page-header title="Done" />
        </template>
        <todo-list-table :with-quick-create="false" :with-header="false" />
      </n-collapse-item>
    </n-collapse>
  </n-space>
</template>
