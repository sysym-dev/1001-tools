<script setup lang="ts">
import {
  NSpace,
  NButton,
  NIcon,
  NInput,
  NSelect,
  SelectOption,
} from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import TodoCreateModal from './todo-create-modal.vue';
import TodoListSortDropdown from './todo-list-sort-dropdown.vue';
import TodoListFilterDropdown from './todo-list-filter-dropdown.vue';
import { ref, computed } from 'vue';

const props = defineProps<{
  filter: Record<string, any>;
  sort: string;
}>();
const emit = defineEmits<{
  'update:filter': [values: Record<string, any>];
  'update:sort': [value: string];
  filter: [];
  sort: [];
}>();

const filter = computed({
  get() {
    return props.filter;
  },
  set(value) {
    emit('update:filter', value);
  },
});
const sort = computed({
  get() {
    return props.sort;
  },
  set(value) {
    emit('update:sort', value);
  },
});
const selectedStatus = computed<string>({
  get() {
    if (filter.value.is_done === null) {
      return 'all';
    }

    if (filter.value.is_done) {
      return 'done';
    }

    return 'todo';
  },
  set(value) {
    if (value === 'all') {
      filter.value.is_done = null;
    } else if (value === 'done') {
      filter.value.is_done = true;
    } else {
      filter.value.is_done = false;
    }

    emit('filter');
  },
});

const visibleCreate = ref(false);

const sortDirectionOptions: SelectOption[] = [
  {
    label: 'All Status',
    value: 'all',
  },
  {
    label: 'Todo',
    value: 'todo',
  },
  {
    label: 'Done',
    value: 'done',
  },
  {
    label: 'Late',
    value: 'late',
  },
];

function handleCreate() {
  visibleCreate.value = true;
}
function handleSort() {
  emit('sort');
}
</script>

<template>
  <n-space>
    <n-input placeholder="Search" />
    <n-select
      :style="{
        width: '125px',
      }"
      :options="sortDirectionOptions"
      placeholder="Status"
      v-model:value="selectedStatus"
    />
    <todo-list-filter-dropdown v-model="filter" />
    <todo-list-sort-dropdown v-model="sort" v-on:sort="handleSort" />
    <n-button type="primary" v-on:click="handleCreate">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New
    </n-button>
  </n-space>

  <todo-create-modal v-model:visible="visibleCreate" />
</template>
