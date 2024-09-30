<script setup>
import BaseContainer from 'src/components/base/base-container.vue';

const menus = [
  { id: 'tools', name: 'Tools' },
  { id: 'github', name: 'Github' },
];
</script>

<template>
  <footer class="border-t h-16">
    <base-container class="flex items-center h-full justify-between">
      <span>&copy; 2014</span>
      <nav>
        <ul class="flex items-center gap-x-4">
          <li v-for="menu in menus" :key="menu.id">{{ menu.name }}</li>
        </ul>
      </nav>
    </base-container>
  </footer>
</template>
