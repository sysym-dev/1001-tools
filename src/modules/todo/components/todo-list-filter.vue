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
import { debounce } from 'src/utils/debounce';

const props = defineProps<{
  filter: Record<string, any>;
  sort: string;
  withCreate?: boolean;
}>();
const emit = defineEmits<{
  'update:filter': [values: Record<string, any>];
  'update:sort': [value: string];
  filter: [];
  sort: [];
  created: [];
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
    if (filter.value.is_late) {
      return 'late';
    }

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
      filter.value.is_late = null;
    } else if (value === 'done') {
      filter.value.is_done = true;
      filter.value.is_late = null;
    } else if (value === 'late') {
      filter.value.is_done = null;
      filter.value.is_late = true;
    } else {
      filter.value.is_done = false;
      filter.value.is_late = null;
    }

    emit('filter');
  },
});

const visibleCreate = ref(false);

const statusOptions: SelectOption[] = [
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

const debounceFilter = debounce(() => emit('filter'));

function handleCreate() {
  visibleCreate.value = true;
}
function handleSort() {
  emit('sort');
}
function handleFilter(options?: { debounce: boolean }) {
  if (options?.debounce) {
    debounceFilter();
  } else {
    emit('filter');
  }
}
function handleCreated() {
  emit('created');
}
</script>

<template>
  <n-space>
    <n-input
      placeholder="Search"
      v-model:value="filter.search"
      v-on:input="handleFilter({ debounce: true })"
    />
    <n-select
      :style="{
        width: '125px',
      }"
      :options="statusOptions"
      placeholder="Status"
      v-model:value="selectedStatus"
    />
    <todo-list-filter-dropdown v-model="filter" v-on:filter="handleFilter" />
    <todo-list-sort-dropdown v-model="sort" v-on:sort="handleSort" />
    <n-button v-if="withCreate" type="primary" v-on:click="handleCreate">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New
    </n-button>
  </n-space>

  <todo-create-modal
    v-if="withCreate"
    v-model:visible="visibleCreate"
    v-on:created="handleCreated"
  />
</template>
