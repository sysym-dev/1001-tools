<script setup lang="ts">
import {
  NSpace,
  NButton,
  NIcon,
  NInput,
  NDropdown,
  DropdownRenderOption,
  NSelect,
  SelectOption,
  NFormItem,
  NInputGroup,
} from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import { MoreHorizontal16Regular } from '@vicons/fluent';
import TodoCreateModal from './todo-create-modal.vue';
import { ref, h } from 'vue';

const visibleCreate = ref(false);
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
        NFormItem,
        { label: 'Sort', showFeedback: false },
        {
          default: () =>
            h(NInputGroup, null, {
              default: () => [
                h(NSelect, { options: sortOptions, placeholder: 'Column' }),
                h(NSelect, {
                  style: { width: '60%' },
                  options: sortDirectionOptions,
                  placeholder: 'Asc',
                }),
              ],
            }),
        },
      ),
  },
];

function handleCreate() {
  visibleCreate.value = true;
}
</script>

<template>
  <n-space>
    <n-input placeholder="Search" />
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
            <more-horizontal-16-regular />
          </n-icon>
        </template>
      </n-button>
    </n-dropdown>
    <n-button type="primary" v-on:click="handleCreate">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New
    </n-button>
  </n-space>

  <todo-create-modal v-model:visible="visibleCreate" />
</template>
