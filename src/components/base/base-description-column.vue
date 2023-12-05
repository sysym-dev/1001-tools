<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  customPadding: String,
});
</script>

<template>
  <dl class="grid grid-cols-1 sm:grid-cols-2">
    <div
      v-for="(column, index) in columns"
      :key="column.id"
      :class="[
        index > 1 ? 'border-t border-gray-100' : '',
        column.fullwidth ? 'sm:col-span-2' : 'sm:col-span-1',
        customPadding ?? 'px-4 py-6 sm:px-0',
      ]"
    >
      <dt class="text-sm font-medium leading-6 text-gray-900">
        {{ column.name }}
      </dt>
      <dd v-if="column.type === 'render'" class="mt-1 sm:mt-2">
        <component :is="column.component" />
      </dd>
      <dd v-else class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
        {{ data[column.id] }}
      </dd>
    </div>
  </dl>
</template>
