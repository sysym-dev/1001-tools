<script setup>
import BaseContainer from 'src/components/base/base-container.vue';
import { inject } from 'vue';

const config = inject('config');

const menus = [
  { id: 'tools', name: 'Tools', to: { name: 'index' } },
  { id: 'github', name: 'Github', url: config.githubUrl },
];
</script>

<template>
  <nav class="h-16 bg-sky-600 text-white">
    <base-container class="flex items-center h-full justify-between">
      <router-link :to="{ name: 'index' }" class="font-bold">Home</router-link>
      <nav>
        <ul class="flex items-center gap-x-4">
          <li v-for="menu in menus" :key="menu.id">
            <a v-if="menu.url" :href="menu.url" target="_blank">{{
              menu.name
            }}</a>
            <router-link v-else :to="menu.to">{{ menu.name }}</router-link>
          </li>
        </ul>
      </nav>
    </base-container>
  </nav>
</template>
