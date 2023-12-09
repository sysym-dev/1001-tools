<script setup>
import BaseNavbar from './components/base/base-navbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const menus = [
  {
    id: 'home',
    name: 'Dashboard',
    to: {
      name: 'home',
    },
  },
  {
    id: 'task-categories',
    name: 'Category',
    to: {
      name: 'home',
    },
  },
  {
    id: 'tasks',
    name: 'Task',
    to: {
      name: 'home',
    },
  },
];
</script>

<template>
  <base-navbar :menus="menus" :active="route.name" />
  <div class="px-4 py-8 container">
    <router-view />
  </div>
</template>
