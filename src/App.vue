<script setup>
import { useRoute, useRouter } from 'vue-router';
import PartialNavbar from './components/partials/partial-navbar.vue';
import BaseContainer from './components/base/base-container.vue';
import PartialBreadcrumb from './components/partials/partial-breadcrumb.vue';
import { inject } from 'vue';

const config = inject('config');
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
  const title = `${config.app.title} - ${to.meta.title}`;
  const description = to.meta.description;
  const url = new URL(to.fullPath, window.location.origin);

  document.title = title;

  updateMeta('description', description);
  updateMeta('keywords', to.meta.keywords);
  updateMeta('author', config.app.author);
  updateMeta('og:title', title, true);
  updateMeta('og:description', description, true);
  updateMeta(
    'og:image',
    new URL(
      to.path === '/' ? 'images/banner.png' : `images/tools/${to.path}`,
      window.location.origin,
    ),
    true,
  );
  updateMeta('og:url', url, true);
  updateLink('canonical', url);
});
</script>

<template>
  <div class="min-h-screen text-gray-900 flex flex-col justify-between">
    <div>
      <partial-navbar />
      <base-container class="py-10 space-y-6">
        <partial-breadcrumb />
        <header v-if="route.meta.withHeader ?? true">
          <h1 class="text-4xl font-bold tracking-tight">
            {{ route.meta.headingTitle || route.meta.title }}
          </h1>
        </header>
        <main class="space-y-6">
          <router-view />
        </main>
      </base-container>
    </div>
  </div>
</template>
