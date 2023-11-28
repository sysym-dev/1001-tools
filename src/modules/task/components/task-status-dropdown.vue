<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const statusOptions = [
  {
    id: 'todo',
    name: 'Todo',
  },
  {
    id: 'in-progress',
    name: 'In Progress',
  },
  {
    id: 'done',
    name: 'Done',
  },
];
</script>

<template>
  <base-dropdown :options="statusOptions" size="sm">
    <template #toggle="{ toggle }">
      <base-button size="sm" v-on:click="toggle">
        Todo
        <template #append>
          <ChevronDownIcon class="w-4 h-4" />
        </template>
      </base-button>
    </template>
  </base-dropdown>
</template>
