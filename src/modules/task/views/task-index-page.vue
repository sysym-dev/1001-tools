<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/core/components/base/base-heading.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
import TaskCreateModal from 'src/modules/task/components/task-create-modal.vue';
import { ref } from 'vue';

const visibleCreateModal = ref();

function handleCreateTask() {
  visibleCreateModal.value = true;
}
</script>

<template>
  <base-heading title="Tasks">
    <template #actions>
      <base-button
        :classes="{ base: 'hidden sm:block' }"
        color="sky"
        v-on:click="handleCreateTask"
        >New Task</base-button
      >
      <base-button
        :classes="{ base: 'fixed bottom-4 right-4 z-10 sm:hidden' }"
        color="sky"
        size="xl"
        circle
        v-on:click="handleCreateTask"
      >
        <plus-icon class="w-5 h-5" />
      </base-button>
    </template>
  </base-heading>
  <div class="py-5">
    <task-list />
    <task-create-modal v-model:visible="visibleCreateModal" />
  </div>
</template>
