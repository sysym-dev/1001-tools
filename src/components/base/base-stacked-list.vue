<script setup>
import BaseAlert from './base-alert.vue';
import BaseSpinner from './base-spinner.vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click-detail']);

function handleClickDetail(item) {
  emit('click-detail', item);
}
</script>

<template>
  <base-alert v-if="loading" type="info">
    <template #icon>
      <base-spinner size="sm" />
    </template>
    {{ 'Loading' }}
  </base-alert>
  <ul class="divide-y divide-gray-100">
    <li
      v-for="(item, index) in data"
      :key="item.id"
      class="flex items-center justify-between gap-x-6 py-5"
    >
      <div class="min-w-0">
        <p
          class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          v-on:click="handleClickDetail(item)"
        >
          {{ item.name }}
        </p>
        <div
          class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
        >
          <p class="whitespace-nowrap">
            <slot name="description" :item="item">
              {{ item.description }}
            </slot>
          </p>
        </div>
      </div>
      <slot name="actions" :index="index" />
    </li>
  </ul>
</template>
