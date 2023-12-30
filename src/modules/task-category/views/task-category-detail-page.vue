<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseTabs from 'src/components/base/base-tabs.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
import TaskCreateModal from 'src/modules/task/components/task-create-modal.vue';
import WithState from 'src/components/composes/with-state.vue';
import TaskCategoryDetailDescriptionList from 'src/modules/task-category/components/task-category-detail-description-list.vue';
import { h, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from 'src/composes/request.compose';

const route = useRoute();
const router = useRouter();
const {
  isLoading,
  isError,
  error,
  request,
  data: taskCategory,
} = useRequest('/task-categories');

const tabs = [
  {
    id: 'tasks',
    name: 'Task',
    component: () =>
      h('div', { class: 'py-5' }, [
        h(TaskList, {
          filter: {
            task_category_id: route.params.id,
          },
        }),
        h(TaskCreateModal, {
          visible: visibleTaskCreateModal.value,
          'onUpdate:visible': (value) => (visibleTaskCreateModal.value = value),
        }),
      ]),
  },
  {
    id: 'setting',
    name: 'Setting',
    component: () => h(TaskCategoryDetailDescriptionList),
  },
];

const activeTab = ref(route.query.tab ?? 'tasks');
const visibleTaskCreateModal = ref(false);

async function loadTask() {
  try {
    await request({
      url: `/task-categories/${route.params.id}`,
    });
  } catch (err) {
    //
  }
}

function handleCreateTask() {
  visibleTaskCreateModal.value = true;
}

watch(activeTab, (value) => {
  router.push({ query: { tab: value } });
});

loadTask();
</script>

<template>
  <with-state
    :is-loading="isLoading"
    is-loading-blocking
    :is-error="isError"
    is-error-blocking
    :error-message="isError ? error.message : null"
  >
    <div class="space-y-2">
      <base-heading
        :title="taskCategory.data.name"
        :description="`${taskCategory.data.tasks_done_count} / ${taskCategory.data.tasks_count} completed`"
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
  </with-state>
</template>
