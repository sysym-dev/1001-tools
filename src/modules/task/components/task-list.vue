<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskDetailModal from './task-detail-modal.vue';
import TaskStatusCheckboxDropdown from './task-status-checkbox-dropdown.vue';
import WithState from 'src/components/composes/with-state.vue';
import { ref } from 'vue';
import { useRequest } from 'src/composes/request.compose';

defineProps({
  filterable: {
    type: Boolean,
    default: true,
  },
  withSeeAll: {
    type: Boolean,
    default: false,
  },
});

const {
  isLoading,
  isError,
  error,
  request,
  data: tasks,
} = useRequest('/tasks');
const filter = ref({
  statuses: ['todo', 'in-progress'],
});

const visibleDetailModal = ref(false);

async function loadTasks() {
  try {
    await request({
      params: {
        page: {
          size: 5,
        },
      },
    });
  } catch (err) {
    //
  }
}

function handleClickDetail() {
  visibleDetailModal.value = true;
}

loadTasks();
</script>

<template>
  <with-state
    :class="[isLoading && 'mt-4']"
    :error="isError"
    :error-message="isError ? error.message : null"
    :loading="isLoading"
  >
    <div
      v-if="filterable"
      class="flex flex-col items-start gap-2 justify-between sm:flex-row"
    >
      <div class="w-full sm:w-auto">
        <task-status-checkbox-dropdown v-model="filter.statuses" />
      </div>
      <div class="w-full sm:w-auto">
        <base-input
          :with-label="false"
          placeholder="Search"
          width="full"
          size="sm"
        />
      </div>
    </div>
    <base-stacked-list
      :data="tasks.data.rows"
      v-on:click-detail="handleClickDetail"
    >
      <template #description>
        Due on <time datetime="2023-03-17T00:00Z">today</time>
      </template>
      <template #actions="{ index }">
        <div>
          <task-status-dropdown v-model="tasks.data.rows[index].status" />
        </div>
      </template>
    </base-stacked-list>
    <base-button
      v-if="withSeeAll"
      fullwidth
      router-link
      :to="{ name: 'tasks.index' }"
      >See All</base-button
    >
    <task-detail-modal v-model:visible="visibleDetailModal" />
  </with-state>
</template>
