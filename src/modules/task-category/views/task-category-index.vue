<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import TaskList from 'src/modules/task/components/task-list.vue';
</script>

<template>
  <base-heading
    title="Shopping List"
    description="2 / 10 Completed"
    with-description
  >
    <template #actions>
      <base-button :classes="{ base: 'hidden sm:block' }" color="sky"
        >New Task</base-button
      >
    </template>
  </base-heading>
  <task-list />
  <base-button fullwidth>Load More</base-button>
  <base-button
    :classes="{ base: 'fixed bottom-4 right-4 sm:hidden' }"
    color="sky"
    size="xl"
    circle
  >
    <plus-icon class="w-5 h-5" />
  </base-button>
</template>
