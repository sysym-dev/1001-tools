<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseCheckbox from 'src/components/base/base-checkbox.vue';
import { availableStatus, getStatusById } from 'src/modules/task/task-status';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['update:modelValue']);

const selectedStatus = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const label = computed(() => {
  if (!selectedStatus.value?.length) {
    return 'All';
  }

  return selectedStatus.value.map((id) => getStatusById(id).name).join(', ');
});
</script>

<template>
  <base-dropdown :options="availableStatus" size="sm" width="full">
    <template #toggle="{ toggle }">
      <base-button :font-bold="false" v-on:click="toggle"
        >Status: {{ label }}</base-button
      >
    </template>

    <div v-for="status in availableStatus" :key="status.id" class="px-2 py-1">
      <base-checkbox
        :id="status.id"
        :label="status.name"
        :value="status.id"
        v-model="selectedStatus"
      />
    </div>
  </base-dropdown>
</template>
