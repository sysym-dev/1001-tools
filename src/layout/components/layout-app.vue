<script>
import BaseNavbar from 'src/components/base/base-navbar.vue';
import AppProgressBar from 'src/components/app/app-progress-bar.vue';
import { useRoute, useRouter } from 'vue-router';
import { useTitle } from 'src/composes/title.compose';

export default {
  name: 'LayoutApp',
  components: { BaseNavbar, AppProgressBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { setTitle } = useTitle();

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

    router.afterEach((to) => {
      setTitle(to.meta.title);
    });

    return { route, menus };
  },
};
</script>

<template>
  <app-progress-bar />
  <base-navbar :menus="menus" :active="route.name" />
  <div class="px-4 py-8 container">
    <router-view />
  </div>
</template>
