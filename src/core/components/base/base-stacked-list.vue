<script setup>
import BaseEmpty from './base-empty.vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingPosition: {
    type: String,
    default: 'top',
  },
  withDescriptionEnd: {
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
  <ul class="divide-y divide-gray-100">
    <li
      v-for="(item, index) in data"
      :key="item.id"
      :class="[
        'flex items-center justify-between gap-x-6',
        data.length === 1 && 'p-0',
        data.length > 1 && index === 0 && 'pb-5',
        data.length > 1 && index === data.length - 1 && 'pt-5',
        data.length > 1 && index !== 0 && index !== data.length - 1 && 'py-5',
      ]"
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
          <template v-if="withDescriptionEnd">
            <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p class="truncate">
              <slot name="description-end" :item="item">
                {{ item.descriptionEnd }}
              </slot>
            </p>
          </template>
        </div>
      </div>
      <slot name="actions" :index="index" :item="item" />
    </li>
  </ul>
</template>
