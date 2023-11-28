<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';

const props = defineProps({
  modelValue: null,
});
const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const selectedName = computed(
  () => statusOptions.find((option) => option.id === selected.value).name,
);

const statusOptions = [
  {
    id: 'todo',
    name: 'Todo',
  },
  {
    id: 'in-progress',
    name: 'In Progress',
  },
  {
    id: 'done',
    name: 'Done',
  },
];
</script>

<template>
  <base-dropdown :options="statusOptions" size="sm" v-model="selected">
    <template #toggle="{ toggle }">
      <base-button size="sm" v-on:click="toggle">
        {{ selectedName }}
        <template #append>
          <ChevronDownIcon class="w-4 h-4" />
        </template>
      </base-button>
    </template>
  </base-dropdown>
</template>
