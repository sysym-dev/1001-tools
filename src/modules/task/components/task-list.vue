<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskDetailModal from './task-detail-modal.vue';
import { ref } from 'vue';
import { availableStatus } from 'src/modules/task/task-status';

const filter = ref({
  status: null,
});
const tasks = ref([
  {
    id: 1,
    name: 'Cek KHS UTS',
    date: new Date(),
    status: 'done',
  },
  {
    id: 2,
    name: 'Tidur Setelar Asar',
    date: new Date(),
    status: 'in-progress',
  },
  {
    id: 3,
    name: 'Play DLS',
    date: new Date(),
    status: 'todo',
  },
  {
    id: 4,
    name: 'Nonton Siti',
    date: new Date(),
    status: 'todo',
  },
]);

const visibleDetailModal = ref(false);

function handleClickDetail() {
  visibleDetailModal.value = true;
}
</script>

<template>
  <div class="flex items-center gap-x-2 justify-between">
    <base-select
      size="sm"
      placeholder="Filter Status"
      width="fit"
      :options="availableStatus"
      v-model="filter.status"
    />
    <base-input
      :with-label="false"
      placeholder="Search"
      width="fit"
      size="sm"
    />
  </div>
  <ul class="divide-y divide-gray-100">
    <li
      v-for="(task, index) in tasks"
      :key="task.id"
      class="flex items-center justify-between gap-x-6 py-5"
    >
      <div class="min-w-0">
        <p
          class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          v-on:click="handleClickDetail"
        >
          {{ task.name }}
        </p>
        <div
          class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
        >
          <p class="whitespace-nowrap">
            Due on <time datetime="2023-03-17T00:00Z">today</time>
          </p>
        </div>
      </div>
      <task-status-dropdown v-model="tasks[index].status" />
    </li>
  </ul>
  <task-detail-modal v-model:visible="visibleDetailModal" />
</template>
