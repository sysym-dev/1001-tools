<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="bg-gray-50 min-h-screen text-gray-900">
    <div class="py-24 max-w-screen-md mx-auto space-y-4">
      <header>
        <h1 class="text-3xl font-bold tracking-tight">
          {{ route.meta.title }}
        </h1>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>
