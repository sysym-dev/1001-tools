<script setup>
import { computed } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  active: String,
});
const emit = defineEmits(['update:active']);

const active = computed({
  get() {
    return props.active;
  },
  set(value) {
    emit('update:active', value);
  },
});
const activeTab = computed(() => {
  return props.tabs.find((tab) => tab.id === active.value);
});

function handleClickTab(tab) {
  active.value = tab.id;
}
</script>

<template>
  <!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
  <div class="">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <!-- Current: "border-sky-500 text-sky-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
        <a
          v-for="tab in tabs"
          :key="tab.id"
          href="#"
          :class="[
            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
            active === tab.id
              ? 'border-sky-500 text-sky-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
          ]"
          v-on:click="handleClickTab(tab)"
          >{{ tab.name }}</a
        >
      </nav>
    </div>
    <component :is="activeTab.component" />
  </div>
</template>
