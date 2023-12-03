<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseTabs from 'src/components/base/base-tabs.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
import { h, ref } from 'vue';

const tabs = [
  {
    id: 'tasks',
    name: 'Task',
    component: () =>
      h('div', {}, [
        h(TaskList),
        h(
          BaseButton,
          { fullwidth: true },
          {
            default: () => 'Load More',
          },
        ),
      ]),
  },
  {
    id: 'setting',
    name: 'Setting',
  },
];

const activeTab = ref('tasks');
</script>

<template>
  <div class="space-y-2">
    <base-heading
      title="Shopping List"
      description="2 / 10 Completed"
      with-description
    >
      <template #actions>
        <base-button :classes="{ base: 'hidden sm:block' }" color="sky"
          >New Task</base-button
        >
        <base-button
          :classes="{ base: 'fixed bottom-4 right-4 z-10 sm:hidden' }"
          color="sky"
          size="xl"
          circle
        >
          <plus-icon class="w-5 h-5" />
        </base-button>
      </template>
    </base-heading>
    <base-tabs :tabs="tabs" v-model:active="activeTab" />
  </div>
</template>
