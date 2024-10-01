<script setup>
import { useRoute, useRouter } from 'vue-router';
import PartialNavbar from './components/partials/partial-navbar.vue';
import PartialFooter from './components/partials/partial-footer.vue';
import BaseContainer from './components/base/base-container.vue';

const route = useRoute();
const router = useRouter();

router.beforeResolve((to) => {
  if (to.path === '/') {
    document.title = to.meta.title;
  } else {
    document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.meta.title}`;
  }
});
</script>

<template>
  <div class="min-h-screen text-gray-900 flex flex-col justify-between">
    <div>
      <partial-navbar />
      <base-container class="py-10 space-y-4">
        <header v-if="route.meta.withHeader ?? true">
          <h1 class="text-4xl font-bold tracking-tight">
            {{ route.meta.title }}
          </h1>
        </header>
        <main>
          <router-view />
        </main>
      </base-container>
    </div>
    <partial-footer />
  </div>
</template>
