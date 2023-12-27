<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { availableStatus } from 'src/modules/task/task-status';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
  modelValue: null,
  taskId: null,
});
const emit = defineEmits(['update:modelValue', 'change']);

const { isLoading, request } = useRequest('/tasks', {
  method: 'patch',
});

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const selectedName = computed(
  () => availableStatus.find((option) => option.id === selected.value).name,
);
const indicatorColor = computed(() => {
  const colors = {
    todo: 'fill-yellow-500',
    'in-progress': 'fill-sky-500',
    done: 'fill-green-500',
  };

  return colors[selected.value];
});

async function updateStatus(status) {
  try {
    await request({
      url: `/tasks/${props.taskId}`,
      data: {
        status,
      },
    });
  } catch {
    //
  }
}

function handleChange(option) {
  updateStatus(option.id);
}
</script>

<template>
  <base-dropdown
    :options="availableStatus"
    size="sm"
    width="fit"
    v-model="selected"
    v-on:click-option="handleChange"
  >
    <template #toggle="{ toggle }">
      <base-button
        size="sm"
        :loading="isLoading"
        block-loading
        :disabled="isLoading"
        v-on:click="toggle"
      >
        <template #prepend>
          <svg
            :class="['h-1.5 w-1.5', indicatorColor]"
            viewBox="0 0 6 6"
            aria-hidden="true"
          >
            <circle cx="3" cy="3" r="3" />
          </svg>
        </template>
        {{ selectedName }}
        <template #append>
          <ChevronDownIcon class="w-4 h-4" />
        </template>
      </base-button>
    </template>
  </base-dropdown>
</template>
