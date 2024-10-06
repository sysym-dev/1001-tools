<script setup>
import { useRoute } from 'vue-router';
import ToolsList from 'src/components/tools/tools-list.vue';
import { ref } from 'vue';

const route = useRoute();

const search = ref(null);
</script>

<template>
  <header class="space-y-4 py-0">
    <h1 class="font-bold text-4xl tracking-tight">{{ route.meta.title }}</h1>
    <input
      type="text"
      placeholder="Search Tools"
      class="w-full border-gray-200 focus:border-sky-600 focus:ring-sky-600"
      autofocus
      v-model="search"
    />
  </header>
  <hr />
  <tools-list :search="search" />
</template>
