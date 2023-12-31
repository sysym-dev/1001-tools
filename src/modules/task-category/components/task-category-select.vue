<script setup>
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRequest } from 'src/composes/request.compose.js';

const { request, data: taskCategories } = useRequest('/task-categories', {
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
const dropdown = ref(null);
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
function setInfiniteScroll() {
  dropdown.value.contentEl.addEventListener('scroll', (e) => {
    if (
      page.size < taskCategories.value.data.meta.count &&
      e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight
    ) {
      handleLoadMore();
    }
  });
}

function handleLoadMore() {
  page.size += 1;

  loadTaskCategories();
}
function handleOpen() {
  dropdown.value.contentEl.scrollTop = 0;
  page.size = 5;

  loadTaskCategories();
}
function handleSearch() {
  dropdown.value.contentEl.scrollTop = 0;
  page.size = 5;

  loadTaskCategories();
}
function handleSelected() {
  filter.search = options.value.find(
    (option) => option.id === selected.value,
  ).name;
}

onMounted(() => {
  setInfiniteScroll();
});
</script>

<template>
  <base-input with-label label="Select Category">
    <base-dropdown
      ref="dropdown"
      width="full"
      :options="options"
      :classes="{
        contentWrapper: 'max-h-[150px] overflow-y-auto',
      }"
      v-on:open="handleOpen"
      v-on:click-option="handleSelected"
      v-model="selected"
    >
      <template #toggle="{ open }">
        <base-input
          :with-label="false"
          placeholder="Select Category"
          v-model="filter.search"
          v-on:focus="open"
          v-on:debounce-input="handleSearch"
        />
      </template>
    </base-dropdown>
  </base-input>
</template>
