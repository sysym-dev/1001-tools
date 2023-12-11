<script setup>
defineProps({
  items: {
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
  <dl class="divide-y divide-gray-100">
    <div
      v-for="item in items"
      :key="item.id"
      :class="[
        'sm:grid sm:grid-cols-3 sm:gap-4',
        customPadding ?? 'px-4 py-6 sm:px-0',
      ]"
    >
      <dt class="text-sm font-medium leading-6 text-gray-900">
        {{ item.name }}
      </dt>
      <dd class="mt-1 sm:col-span-2 sm:mt-0">
        <component v-if="item.render" :is="item.render" />
        <span class="text-sm leading-6 text-gray-700">{{ data[item.id] }}</span>
      </dd>
    </div>
  </dl>
</template>
