<script setup>
import { useRoute, useRouter } from 'vue-router';
import PartialNavbar from './components/partials/partial-navbar.vue';
import PartialFooter from './components/partials/partial-footer.vue';
import BaseContainer from './components/base/base-container.vue';

const route = useRoute();
const router = useRouter();

function updateMeta(nameOrProperty, content, isProperty = false) {
  const meta = document.querySelector(
    `meta[${isProperty ? 'property' : 'name'}="${nameOrProperty}"]`,
  );

  meta.setAttribute('content', content);
}

function updateLink(rel, href) {
  const link = document.querySelector(`link[rel=${rel}]`);

  link.setAttribute('href', href);
}

router.beforeResolve((to) => {
  const title = `${import.meta.env.VITE_APP_TITLE} - ${to.meta.title}`;
  const description = to.meta.description;
  const url = new URL(to.fullPath, window.location.origin);

  document.title = title;

  updateMeta('description', description),
    updateMeta('keywords', to.meta.keywords.join(', ')),
    updateMeta('author', import.meta.env.VITE_APP_AUTHOR),
    updateMeta('og:title', title, true),
    updateMeta('og:description', description, true),
    updateMeta(
      'og:image',
      new URL(
        to.path === '/' ? 'images/banner.png' : `images/tools/${to.path}`,
        window.location.origin,
      ),
      true,
    ),
    updateMeta('og:url', url, true),
    updateLink('canonical', url);
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
