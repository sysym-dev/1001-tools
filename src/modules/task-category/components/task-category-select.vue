<script setup>
import BaseSelectSearch from 'src/components/base/base-select-search.vue';
import { computed, reactive, ref } from 'vue';
import { useRequest } from 'src/composes/request.compose.js';

const {
  isLoading,
  request,
  data: taskCategories,
} = useRequest('/task-categories', {
  initData: {
    data: {
      rows: [],
    },
  },
});

const page = reactive({
  size: 5,
});
const filter = reactive({
  search: null,
});
const selected = ref(null);

const options = computed(() => {
  return taskCategories.value.data.rows;
});

async function loadTaskCategories() {
  try {
    await request({
      params: {
        page,
        filter,
      },
    });
  } catch (err) {
    //
  }
}

function handleLoadMore() {
  if (page.size < taskCategories.value.data.meta.count) {
    page.size += 5;

    loadTaskCategories();
  }
}
function handleOpen() {
  page.size = 5;

  loadTaskCategories();
}
function handleSearch() {
  page.size = 5;

  loadTaskCategories();
}
function handleClear() {
  filter.search = null;

  loadTaskCategories();
}
</script>

<template>
  <base-select-search
    label="Select Category"
    placeholder="Select Category"
    :loading="isLoading"
    :options="options"
    v-model="selected"
    v-model:search="filter.search"
    v-on:load-more="handleLoadMore"
    v-on:open="handleOpen"
    v-on:search="handleSearch"
    v-on:clear="handleClear"
  />
</template>
