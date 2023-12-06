<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDescriptionColumn from 'src/components/base/base-description-column.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskEditModal from './task-edit-modal.vue';
import { computed, h, ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

const visibleEditModal = ref(false);
const status = ref('todo');
const columns = [
  {
    id: 'due_at',
    name: 'Due At',
  },
  {
    id: 'status',
    name: 'Status',
    type: 'render',
    component: () => h(TaskStatusDropdown, { modelValue: status.value }),
  },
  {
    id: 'description',
    name: 'Description',
    fullwidth: true,
  },
];

function handleClose() {
  visible.value = false;
}
function handleEdit() {
  visibleEditModal.value = true;
  visible.value = false;
}
function handleCloseEditModal() {
  visible.value = true;
}
</script>

<template>
  <base-modal size="md" v-model:visible="visible">
    <base-card
      title="Cek KHS UTS"
      :classes="{ body: 'p-0' }"
      body-no-padding
      v-on:click-outside="handleClose"
    >
      <base-description-column
        :columns="columns"
        :data="{
          due_at: 'Today',
          description:
            'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
        }"
        custom-padding="px-4 py-5 sm:px-6"
      ></base-description-column>

      <template #footer>
        <div class="flex items-center justify-end gap-x-2">
          <base-button color="sky" v-on:click="handleEdit">Edit</base-button>
          <base-button v-on:click="handleClose">Close</base-button>
        </div>
      </template>
    </base-card>
  </base-modal>

  <task-edit-modal
    v-model:visible="visibleEditModal"
    v-on:close="handleCloseEditModal"
  />
</template>
