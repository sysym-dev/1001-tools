<script setup lang="ts">
import {
  NSpace,
  NButton,
  NIcon,
  NDropdown,
  DropdownRenderOption,
  NSelect,
  SelectOption,
  NFormItem,
} from 'naive-ui';
import { ArrowSortDownLines16Regular } from '@vicons/fluent';
import { h } from 'vue';

const sortOptions: SelectOption[] = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Done At',
    value: 'done at',
  },
];
const sortDirectionOptions: SelectOption[] = [
  {
    label: 'Asc',
    value: 'asc',
  },
  {
    label: 'Desc',
    value: 'desc',
  },
];

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
              { label: 'Sort Column', showFeedback: false },
              {
                default: () =>
                  h(NSelect, { options: sortOptions, placeholder: 'Column' }),
              },
            ),
            h(
              NFormItem,
              { label: 'Sort Direction', showFeedback: false },
              {
                default: () =>
                  h(NSelect, {
                    options: sortDirectionOptions,
                    placeholder: 'Direction',
                  }),
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
          <arrow-sort-down-lines-16-regular />
        </n-icon>
      </template>
      Created At
    </n-button>
  </n-dropdown>
</template>
