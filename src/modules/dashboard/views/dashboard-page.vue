<script setup lang="ts">
import { NStatistic, NGrid, NGi, NCard } from 'naive-ui';
</script>

<template>
  <n-grid :cols="4" x-gap="16">
    <n-gi>
      <n-card>
        <n-statistic label="Total Task" value="88" />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Total Task Todo" value="88" />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Total Task Done" value="88" />
      </n-card>
    </n-gi>
  </n-grid>
</template>
