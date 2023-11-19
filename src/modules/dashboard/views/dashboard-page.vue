<script setup lang="ts">
import { NStatistic, NGrid, NGi, NCard, NSpace } from 'naive-ui';
import { useRequest } from 'src/common/http/composes/request.compose';
import { Dashboard } from '../dashboard.entity';
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
import { parseDate } from 'src/utils/date';

const { request, res } = useRequest<Dashboard>({
  method: 'get',
  url: '/dashboard',
  transformResult: (data: any) => data.data,
});

async function loadDashboard() {
  await request();
}

loadDashboard();
</script>

<template>
  <n-space vertical :size="16">
    <n-grid :cols="4" x-gap="16">
      <n-gi>
        <n-card>
          <n-statistic label="Total Task" :value="res?.taskCount ?? 0" />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card>
          <n-statistic label="Total Task Todo" :value="res?.todoCount ?? 0" />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card>
          <n-statistic label="Total Task Done" :value="res?.doneCount ?? 0" />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card>
          <n-statistic label="Total Task Late" :value="res?.lateCount ?? 0" />
        </n-card>
      </n-gi>
    </n-grid>
    <n-card>
      <todo-list-table
        title="Today Todo"
        with-header
        with-status-quick-action
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
    </n-card>
  </n-space>
</template>
