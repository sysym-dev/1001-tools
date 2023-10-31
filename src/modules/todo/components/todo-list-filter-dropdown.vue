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

const props = defineProps<{
  modelValue: Record<string, any>;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
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
                    value: filter.value.due_at,
                    'onUpdate:value': (value: number) =>
                      (filter.value.due_at = value),
                  }),
              },
            ),
            h(
              NFormItem,
              { label: 'Done At', showFeedback: false },
              {
                default: () => h(NDatePicker),
              },
            ),
          ],
        },
      ),
  },
];
</script>

<template>
  {{ filter }}
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
