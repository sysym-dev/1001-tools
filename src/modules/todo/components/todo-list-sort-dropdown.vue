<script setup lang="ts">
import {
  NSpace,
  NButton,
  NIcon,
  NDropdown,
  DropdownRenderOption,
  NSelect,
  SelectOption,
  NFormItem,
} from 'naive-ui';
import {
  TextSortAscending16Regular,
  TextSortDescending16Regular,
} from '@vicons/fluent';
import { h, computed } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: string];
  sort: [];
}>();

const selectedSort = computed<string>({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
    emit('sort');
  },
});
const selectedDirection = computed<string>({
  get() {
    return selectedSort.value.charAt(0) === '-' ? 'desc' : 'asc';
  },
  set(value) {
    selectedSort.value =
      value === 'asc' ? selectedColumn.value : `-${selectedColumn.value}`;
  },
});
const selectedColumn = computed<string>({
  get() {
    return selectedDirection.value === 'asc'
      ? selectedSort.value
      : selectedSort.value.slice(1);
  },
  set(value) {
    selectedSort.value =
      selectedDirection.value === 'asc' ? value : `-${value}`;
  },
});

const sortColumnOptions: SelectOption[] = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Created At',
    value: 'created_at',
  },
  {
    label: 'Done At',
    value: 'done_at',
  },
];
const sortDirectionOptions: SelectOption[] = [
  {
    label: 'Asc',
    value: 'asc',
  },
  {
    label: 'Desc',
    value: 'desc',
  },
];

const filterOptions: DropdownRenderOption[] = [
  {
    key: 'sort',
    label: 'Sort',
    type: 'render',
    render: () =>
      h(
        NSpace,
        { size: 'large', vertical: true },
        {
          default: () => [
            h(
              NFormItem,
              { label: 'Sort Column', showFeedback: false },
              {
                default: () =>
                  h(NSelect, {
                    options: sortColumnOptions,
                    placeholder: 'Column',
                    value: selectedColumn.value,
                    'onUpdate:value': (value: string) =>
                      (selectedColumn.value = value),
                  }),
              },
            ),
            h(
              NFormItem,
              { label: 'Sort Direction', showFeedback: false },
              {
                default: () =>
                  h(NSelect, {
                    options: sortDirectionOptions,
                    placeholder: 'Direction',
                    value: selectedDirection.value,
                    'onUpdate:value': (value: string) =>
                      (selectedDirection.value = value),
                  }),
              },
            ),
          ],
        },
      ),
  },
];

const selectedColumnName = computed<string>((): string => {
  return sortColumnOptions.find(
    (options) => options.value === selectedColumn.value,
  )?.label as string;
});
</script>

<template>
  <n-dropdown
    trigger="click"
    placement="bottom-end"
    :options="filterOptions"
    :width="200"
    :style="{
      padding: '14px',
    }"
  >
    <n-button>
      <template #icon>
        <n-icon>
          <text-sort-descending-16-regular
            v-if="selectedDirection === 'desc'"
          />
          <text-sort-ascending-16-regular v-else />
        </n-icon>
      </template>
      {{ selectedColumnName }}
    </n-button>
  </n-dropdown>
</template>
