<script>
import BaseNavbar from 'src/components/base/base-navbar.vue';
import AppNotification from 'src/features/app/components/app-notification.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'LayoutApp',
  components: { BaseNavbar, AppNotification },
  setup() {
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
        id: 'task-categories.index',
        name: 'Category',
        to: {
          name: 'task-categories.index',
        },
      },
      {
        id: 'tasks.index',
        name: 'Task',
        to: {
          name: 'tasks.index',
        },
      },
    ];

    return { route, menus };
  },
};
</script>

<template>
  <app-notification />
  <base-navbar :menus="menus" :active="route.name" />
  <div class="px-4 py-8 container">
    <router-view />
  </div>
</template>
