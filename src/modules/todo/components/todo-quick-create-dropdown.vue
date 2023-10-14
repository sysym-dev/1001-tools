<script setup lang="ts">
import {
  NButton,
  NIcon,
  NDropdown,
  DropdownRenderOption,
  NInput,
} from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import { h } from 'vue';

const form: DropdownRenderOption[] = [
  {
    key: 'form',
    type: 'render',
    render: () => h('div', { style: 'padding: 8px; 12px' }, [h(NInput)]),
  },
];
</script>

<template>
  <n-dropdown :options="form" trigger="click" placement="bottom-start">
    <n-button text type="primary">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New Todo
    </n-button>
  </n-dropdown>
</template>
