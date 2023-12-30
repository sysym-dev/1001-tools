<script setup>
import BaseDescriptionList from 'src/components/base/base-description-list.vue';
import BaseButton from 'src/components/base/base-button.vue';
import TaskCategoryEditModal from './task-category-edit-modal.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import { h, ref } from 'vue';

defineProps({
  taskCategory: {
    type: Object,
    default: () => ({}),
  },
});

const visibleEditModal = ref(false);
const visibleDeleteConfirm = ref(false);

function handleEdit() {
  visibleEditModal.value = true;
}
function handleDelete() {
  visibleDeleteConfirm.value = true;
}
</script>

<template>
  <base-description-list
    custom-padding="py-6 px-0"
    :items="[
      {
        id: 'name',
        name: 'Name',
      },
      {
        id: 'description',
        name: 'Description',
        value: (item) => item.description ?? '-',
      },
      {
        id: 'actions',
        name: 'Actions',
        render: () =>
          h('div', { class: 'flex gap-x-2' }, [
            h(
              BaseButton,
              {
                color: 'sky',
                onClick: handleEdit,
              },
              {
                default: () => 'Edit',
              },
            ),
            h(
              BaseButton,
              {
                color: 'red',
                onClick: handleDelete,
              },
              {
                default: () => 'Delete',
              },
            ),
          ]),
      },
    ]"
    :data="taskCategory"
  />
  <task-category-edit-modal
    :task-category="taskCategory"
    v-model:visible="visibleEditModal"
  />
  <task-category-delete-confirm v-model:visible="visibleDeleteConfirm" />
</template>
