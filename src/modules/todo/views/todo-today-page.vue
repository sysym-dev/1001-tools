<script setup lang="ts">
import { NSpace, NCollapse, NCollapseItem, NPageHeader } from 'naive-ui';
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
import { parseDate } from 'src/utils/date';
</script>

<template>
  <n-space vertical :size="[0, 16]">
    <todo-list-table
      title="Today"
      :subtitle="parseDate(new Date()).format('LL')"
      with-quick-create
      with-header
      :filter="{
        due_at_from: parseDate(new Date()).startOf('d').toISOString(),
        due_at_to: parseDate(new Date()).endOf('d').toISOString(),
        is_done: false,
      }"
      sort="created_at"
      :page="{
        size: 100,
      }"
    />

    <n-collapse display-directive="show">
      <n-collapse-item title="Done">
        <template #header>
          <n-page-header title="Done" />
        </template>
        <todo-list-table
          :with-quick-create="false"
          :with-header="false"
          :filter="{
            due_at_from: parseDate(new Date()).startOf('d').toISOString(),
            due_at_to: parseDate(new Date()).endOf('d').toISOString(),
            is_done: true,
          }"
          sort="created_at"
          :page="{
            size: 100,
          }"
        />
      </n-collapse-item>
    </n-collapse>
  </n-space>
</template>
