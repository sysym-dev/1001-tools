<script setup>
import BaseContainer from 'src/components/base/base-container.vue';

const menus = [
  { id: 'tools', name: 'Tools' },
  { id: 'github', name: 'Github' },
];
</script>

<template>
  <nav class="h-16 bg-sky-600 text-white">
    <base-container class="flex items-center h-full justify-between">
      <a href="" class="font-bold">Home</a>
      <nav>
        <ul class="flex items-center gap-x-4">
          <li v-for="menu in menus" :key="menu.id">{{ menu.name }}</li>
        </ul>
      </nav>
    </base-container>
  </nav>
</template>
