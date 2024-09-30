<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const menus = [
  { id: 'tools', name: 'Tools' },
  { id: 'github', name: 'Github' },
];
</script>

<template>
  <div class="min-h-screen text-gray-900">
    <nav class="h-16 bg-sky-600 text-white">
      <div
        class="max-w-screen-xl mx-auto flex items-center h-full justify-between"
      >
        <a href="" class="font-bold">Home</a>
        <nav>
          <ul class="flex items-center gap-x-4">
            <li v-for="menu in menus" :key="menu.id">{{ menu.name }}</li>
          </ul>
        </nav>
      </div>
    </nav>
    <div class="py-10 max-w-screen-xl mx-auto space-y-4">
      <header v-if="route.meta.withHeader ?? true">
        <h1 class="text-4xl font-bold tracking-tight">
          {{ route.meta.title }}
        </h1>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>
