<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseStackedList from 'src/components/base/base-stacked-list.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskDetailModal from './task-detail-modal.vue';
import { ref } from 'vue';
import { availableStatus } from 'src/modules/task/task-status';

defineProps({
  filterable: {
    type: Boolean,
    default: true,
  },
});

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
  <div v-if="filterable" class="flex items-center gap-x-2 justify-between">
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
  <base-stacked-list :data="tasks" v-on:click-detail="handleClickDetail">
    <template #description>
      Due on <time datetime="2023-03-17T00:00Z">today</time>
    </template>
    <template #actions="{ index }">
      <task-status-dropdown v-model="tasks[index].status" />
    </template>
  </base-stacked-list>
  <task-detail-modal v-model:visible="visibleDetailModal" />
</template>
