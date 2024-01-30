<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/core/components/base/base-heading.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseTabs from 'src/core/components/base/base-tabs.vue';
import TaskList from 'src/features/task/components/task-list.vue';
import TaskCreateModal from 'src/features/task/components/task-create-modal.vue';
import WithState from 'src/core/components/base/base-state.vue';
import TaskCategoryDetailDescriptionList from 'src/features/task-category/components/task-category-detail-description-list.vue';
import { inject, h, ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from 'src/core/request/request.compose';
import { useTitle } from 'src/core/composes/title.compose';

const route = useRoute();
const router = useRouter();
const { setTitle } = useTitle();
const {
  isLoading,
  isError,
  error,
  request,
  data: taskCategory,
} = useRequest('/task-categories');
const emitter = inject('emitter');

const activeTab = ref(route.query.tab ?? 'tasks');
const visibleTaskCreateModal = ref(false);

const tabs = computed(() => {
  return [
    {
      id: 'tasks',
      name: 'Task',
      component: () =>
        h('div', { class: 'py-5' }, [
          h(TaskList, {
            filter: {
              task_category_id: route.params.id,
            },
            elements: {
              category: false,
            },
            editElements: {
              task_category_id: false,
            },
            page: {
              size: 10,
            },
          }),
        ]),
    },
    {
      id: 'setting',
      name: 'Setting',
      component: () =>
        h(TaskCategoryDetailDescriptionList, {
          taskCategory: taskCategory.value.data,
        }),
    },
  ];
});

async function loadTaskCategory() {
  try {
    await request({
      url: `/task-categories/${route.params.id}`,
    });

    setTitle(taskCategory.value.data.name);
  } catch (err) {
    //
  }
}

function handleCreateTask() {
  visibleTaskCreateModal.value = true;
}
function handleUpdated() {
  loadTaskCategory();
}
function handleDeleted() {
  router.push({ name: 'task-categories.index' });
}

watch(activeTab, (value) => {
  router.push({ query: { tab: value } });
});

onMounted(() => {
  emitter.on('task-categories-updated', handleUpdated);
  emitter.on('task-categories-deleted', handleDeleted);
});
onUnmounted(() => {
  emitter.off('task-categories-updated');
  emitter.off('task-categories-deleted');
});

loadTaskCategory();
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
    <task-create-modal
      :values="{
        task_category_id: taskCategory.data.id,
      }"
      :elements="{
        task_category_id: false,
      }"
      v-model:visible="visibleTaskCreateModal"
    />
  </with-state>
</template>
