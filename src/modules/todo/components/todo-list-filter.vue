<script setup lang="ts">
import { NSpace, NButton, NIcon, NInput } from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import TodoCreateModal from './todo-create-modal.vue';
import TodoListSortDropdown from './todo-list-sort-dropdown.vue';
import { ref } from 'vue';

const visibleCreate = ref(false);

function handleCreate() {
  visibleCreate.value = true;
}
</script>

<template>
  <n-space>
    <n-input placeholder="Search" />
    <todo-list-sort-dropdown />
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
