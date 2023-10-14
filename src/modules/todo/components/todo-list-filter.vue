<script setup lang="ts">
import { NSpace, NButton, NIcon, NInput, NDropdown } from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import { MoreHorizontal16Regular } from '@vicons/fluent';
import TodoCreateModal from './todo-create-modal.vue';
import { ref } from 'vue';

const visibleCreate = ref(false);

function handleCreate() {
  visibleCreate.value = true;
}
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
