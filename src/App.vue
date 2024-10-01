<script setup>
import { useRoute, useRouter } from 'vue-router';
import PartialNavbar from './components/partials/partial-navbar.vue';
import PartialFooter from './components/partials/partial-footer.vue';
import BaseContainer from './components/base/base-container.vue';

const route = useRoute();
const router = useRouter();

function createMeta(nameOrProperty, content, isProperty = false) {
  const meta = document.createElement('meta');

  meta.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
  meta.setAttribute('content', content);

  return meta;
}

router.beforeResolve((to) => {
  const title =
    to.path === '/'
      ? to.meta.title
      : `${import.meta.env.VITE_APP_TITLE} - ${to.meta.title}`;
  const description = to.meta.description;

  document.title = title;

  const meta = [
    createMeta('description', description),
    createMeta('keywords', to.meta.keywords.join(', ')),
    createMeta('author', import.meta.env.VITE_APP_AUTHOR),
    createMeta('og:title', title, true),
    createMeta('og:description', description, true),
    createMeta('og:image', 'image', true),
    createMeta('og:url', route.fullPath, true),
    createMeta('twitter:card', 'image'),
    createMeta('twitter:title', title),
    createMeta('twitter:description', description),
    createMeta('twitter:image', 'image'),
  ];

  document.querySelector('head').append(...meta);
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
