<script setup lang="ts">
import { NStatistic, NGrid, NGi, NCard } from 'naive-ui';
import { useRequest } from 'src/common/http/composes/request.compose';
import { Dashboard } from '../dashboard.entity';

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
</template>
