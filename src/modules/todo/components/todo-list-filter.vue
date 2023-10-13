<script setup lang="ts">
import { NSpace, NButton, NIcon, NInput, NDropdown } from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import { MoreHorizontal16Regular } from '@vicons/fluent';
</script>

<template>
  <n-space>
    <n-input placeholder="Search" />
    <n-dropdown>
      <n-button>
        <template #icon>
          <n-icon>
            <more-horizontal-16-regular />
          </n-icon>
        </template>
      </n-button>
    </n-dropdown>
    <n-button type="primary">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New
    </n-button>
  </n-space>
</template>
