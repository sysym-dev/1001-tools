<script setup>
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import BaseInput from 'src/components/base/base-input.vue';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRequest } from 'src/composes/request.compose.js';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
  label: String,
  placeholder: String,
  loading: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: null,
  search: null,
});
const emit = defineEmits([
  'update:modelValue',
  'update:search',
  'load-more',
  'open',
  'search',
  'clear',
]);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const search = computed({
  get() {
    return props.search;
  },
  set(value) {
    emit('update:search', value);
  },
});

const dropdown = ref(null);

function setInfiniteScroll() {
  dropdown.value.contentEl.addEventListener('scroll', (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
      handleLoadMore();
    }
  });
}

function handleLoadMore() {
  emit('load-more');
}
function handleOpen() {
  dropdown.value.contentEl.scrollTop = 0;

  emit('open');
}
function handleSearch() {
  dropdown.value.contentEl.scrollTop = 0;

  emit('search', search.value);
}
async function handleSelected() {
  await nextTick();

  search.value = props.options.find(
    (option) => option.id === selected.value,
  ).name;
}
function handleClear() {
  selected.value = null;
  search.value = null;

  emit('clear');
}

onMounted(() => {
  setInfiniteScroll();
});
</script>

<template>
  <base-input with-label :label="label">
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
          :placeholder="placeholder"
          :loading="loading"
          v-model="search"
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
