<script setup lang="ts">
import {
  NSpace,
  NButton,
  NIcon,
  NDropdown,
  DropdownRenderOption,
  NFormItem,
  NDatePicker,
} from 'naive-ui';
import { Filter16Regular } from '@vicons/fluent';
import { h, computed } from 'vue';
import { getTimestamp, fromTimestamp } from 'src/utils/date';

const props = defineProps<{
  modelValue: Record<string, any>;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
  filter: [];
}>();

const filter = computed<Record<string, any>>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

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
              { label: 'Due At', showFeedback: false },
              {
                default: () =>
                  h(NDatePicker, {
                    clearable: true,
                    value: filter.value.due_at_from
                      ? getTimestamp(filter.value.due_at_from)
                      : filter.value.due_at_from,
                    'onUpdate:value': (value: number) => {
                      filter.value.due_at_from = value
                        ? fromTimestamp(value).startOf('day').toDate()
                        : value;
                      filter.value.due_at_to = value
                        ? fromTimestamp(value).endOf('day').toDate()
                        : value;

                      emit('filter');
                    },
                  }),
              },
            ),
            h(
              NFormItem,
              { label: 'Done At', showFeedback: false },
              {
                default: () =>
                  h(NDatePicker, {
                    clearable: true,
                    value: filter.value.done_at_from
                      ? getTimestamp(filter.value.done_at_from)
                      : filter.value.done_at_from,
                    'onUpdate:value': (value: number) => {
                      filter.value.done_at_from = value
                        ? fromTimestamp(value).startOf('day').toDate()
                        : value;
                      filter.value.done_at_to = value
                        ? fromTimestamp(value).endOf('day').toDate()
                        : value;

                      emit('filter');
                    },
                  }),
              },
            ),
          ],
        },
      ),
  },
];
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
          <filter-16-regular />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>
