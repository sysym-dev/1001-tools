<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseWidget from 'src/components/base/base-widget.vue';
import WithState from 'src/components/composes/with-state.vue';
import { useRequest } from 'src/composes/request.compose';

const {
  isLoading,
  isError,
  error,
  request,
  data: taskCategories,
} = useRequest('/task-categories');

async function loadTaskCategories() {
  try {
    await request({
      params: {
        page: {
          size: 4,
        },
      },
    });
  } catch (err) {
    //
  }
}

loadTaskCategories();
</script>

<template>
  <with-state
    :error="isError"
    :error-message="isError ? error.message : null"
    :loading="isLoading"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(category, i) in taskCategories.data.rows"
        :key="category.id"
        :class="[
          i === taskCategories.data.rows.length - 1 && i % 2 === 0
            ? 'col-span-full'
            : '',
        ]"
      >
        <base-widget
          tag="router-link"
          :to="{ name: 'task-categories.detail', params: { id: category.id } }"
          :title="category.name"
          :value="`${category.tasks_done_count} / ${category.tasks_count} completed`"
        />
      </div>
    </div>
    <base-button fullwidth router-link :to="{ name: 'task-categories.index' }"
      >See All</base-button
    >
  </with-state>
</template>
