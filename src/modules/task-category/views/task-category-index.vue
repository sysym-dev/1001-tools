<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseTabs from 'src/components/base/base-tabs.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
import TaskCreateModal from 'src/modules/task/components/task-create-modal.vue';
import { h, ref } from 'vue';

const tabs = [
  {
    id: 'tasks',
    name: 'Task',
    component: () =>
      h('div', { class: 'py-5' }, [
        h(TaskList),
        h(
          BaseButton,
          { fullwidth: true },
          {
            default: () => 'Load More',
          },
        ),
        h(TaskCreateModal, {
          visible: visibleTaskCreateModal.value,
          'onUpdate:visible': (value) => (visibleTaskCreateModal.value = value),
        }),
      ]),
  },
  {
    id: 'setting',
    name: 'Setting',
  },
];

const activeTab = ref('tasks');
const visibleTaskCreateModal = ref(false);

function handleCreateTask() {
  visibleTaskCreateModal.value = true;
}
</script>

<template>
  <div class="space-y-2">
    <base-heading
      title="Shopping List"
      description="2 / 10 Completed"
      with-description
    >
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
    <base-tabs :tabs="tabs" v-model:active="activeTab" />
  </div>
</template>
