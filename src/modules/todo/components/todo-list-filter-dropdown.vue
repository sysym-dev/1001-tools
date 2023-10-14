<script setup lang="ts">
import {
  NSpace,
  NButton,
  NIcon,
  NDropdown,
  DropdownRenderOption,
  NFormItem,
  NDatePicker,
} from 'naive-ui';
import { Filter16Regular } from '@vicons/fluent';
import { h } from 'vue';

const filterOptions: DropdownRenderOption[] = [
  {
    key: 'sort',
    label: 'Sort',
    type: 'render',
    render: () =>
      h(
        NSpace,
        { size: 'large', vertical: true },
        {
          default: () => [
            h(
              NFormItem,
              { label: 'Created At', showFeedback: false },
              {
                default: () => h(NDatePicker),
              },
            ),
            h(
              NFormItem,
              { label: 'Done At', showFeedback: false },
              {
                default: () => h(NDatePicker),
              },
            ),
          ],
        },
      ),
  },
];
</script>

<template>
  <n-dropdown
    trigger="click"
    placement="bottom-end"
    :options="filterOptions"
    :width="200"
    :style="{
      padding: '14px',
    }"
  >
    <n-button>
      <template #icon>
        <n-icon>
          <filter-16-regular />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>
