<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskDetailModal from './task-detail-modal.vue';
import TaskStatusCheckboxDropdown from './task-status-checkbox-dropdown.vue';
import { ref } from 'vue';

defineProps({
  filterable: {
    type: Boolean,
    default: true,
  },
});

const filter = ref({
  statuses: ['todo', 'in-progress'],
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
  <base-stacked-list :data="tasks" v-on:click-detail="handleClickDetail">
    <template #description>
      Due on <time datetime="2023-03-17T00:00Z">today</time>
    </template>
    <template #actions="{ index }">
      <div>
        <task-status-dropdown v-model="tasks[index].status" />
      </div>
    </template>
  </base-stacked-list>
  <task-detail-modal v-model:visible="visibleDetailModal" />
</template>
