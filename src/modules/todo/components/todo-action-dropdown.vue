<script setup lang="ts">
import { NButton, NIcon, NDropdown, DropdownOption } from 'naive-ui';
import { MoreHorizontal16Regular } from '@vicons/fluent';

const emit = defineEmits<{
  edit: [];
}>();

const options: DropdownOption[] = [
  {
    key: 'edit',
    label: 'Edit',
  },
  {
    key: 'delete',
    label: 'Delete',
  },
];

function handleSelect(key: string) {
  if (key === 'edit') {
    emit('edit');
  }
}
</script>

<template>
  <n-dropdown
    :options="options"
    trigger="click"
    placement="bottom-end"
    v-on:select="handleSelect"
  >
    <n-button quaternary size="small">
      <template #icon>
        <n-icon>
          <more-horizontal-16-regular />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>
