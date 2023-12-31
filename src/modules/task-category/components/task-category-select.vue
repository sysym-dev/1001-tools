<script setup>
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRequest } from 'src/composes/request.compose.js';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

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
function handleClear() {
  selected.value = null;
  filter.search = null;

  loadTaskCategories();
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
      <template #toggle="{ open, visible }">
        <base-input
          :with-label="false"
          placeholder="Select Category"
          :loading="isLoading"
          v-model="filter.search"
          v-on:focus="open"
          v-on:debounce-input="handleSearch"
        >
          <template #append>
            <button v-if="selected" type="button" v-on:click="handleClear">
              <x-mark-icon class="w-4 h-4" />
            </button>
            <chevron-up-icon v-if="visible" class="w-4 h-4" />
            <chevron-down-icon v-else class="w-4 h-4" />
          </template>
        </base-input>
      </template>
    </base-dropdown>
  </base-input>
</template>
