<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/core/components/base/base-heading.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import TaskCategoryList from 'src/features/task-category/components/task-category-list.vue';
import TaskCategoryCreateModal from 'src/features/task-category/components/task-category-create-modal.vue';
import { ref } from 'vue';

const visibleCreateModal = ref();

function handleCreateTaskCategory() {
  visibleCreateModal.value = true;
}
</script>

<template>
  <base-heading title="Categories">
    <template #actions>
      <base-button
        :classes="{ base: 'hidden sm:block' }"
        color="sky"
        v-on:click="handleCreateTaskCategory"
        >New Category</base-button
      >
      <base-button
        :classes="{ base: 'fixed bottom-4 right-4 z-10 sm:hidden' }"
        color="sky"
        size="xl"
        circle
        v-on:click="handleCreateTaskCategory"
      >
        <plus-icon class="w-5 h-5" />
      </base-button>
    </template>
  </base-heading>
  <div class="py-5">
    <task-category-list />
    <task-category-create-modal v-model:visible="visibleCreateModal" />
  </div>
</template>
