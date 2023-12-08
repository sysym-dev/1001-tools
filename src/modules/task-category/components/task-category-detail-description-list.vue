<script setup>
import BaseDescriptionList from 'src/components/base/base-description-list.vue';
import BaseButton from 'src/components/base/base-button.vue';
import TaskCategoryEditModal from './task-category-edit-modal.vue';
import TaskCategoryDeleteConfirm from './task-category-delete-confirm.vue';
import { h, ref } from 'vue';

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
    :data="{
      name: 'Shopping List',
      description:
        'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    }"
  />
  <task-category-edit-modal v-model:visible="visibleEditModal" />
  <task-category-delete-confirm v-model:visible="visibleDeleteConfirm" />
</template>
