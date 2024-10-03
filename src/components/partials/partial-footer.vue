<script setup>
import BaseContainer from 'src/components/base/base-container.vue';
import { inject } from 'vue';

const config = inject('config');

const menus = [
  { id: 'tools', name: 'Tools' },
  { id: 'github', name: 'Github', url: config.githubUrl },
];
</script>

<template>
  <footer class="border-t h-16">
    <base-container class="flex items-center h-full">
      <nav>
        <ul class="flex items-center gap-x-4">
          <li v-for="menu in menus" :key="menu.id">
            <a :href="menu.url" target="_blank">{{ menu.name }}</a>
          </li>
        </ul>
      </nav>
    </base-container>
  </footer>
</template>
