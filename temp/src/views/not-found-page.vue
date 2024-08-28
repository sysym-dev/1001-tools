<script setup>
import BaseTitle from 'src/core/components/base/base-title.vue';
</script>

<template>
  <main
    class="min-h-screen flex items-center justify-center bg-white px-6 lg:px-8"
  >
    <div class="text-center">
      <p class="text-base font-semibold text-sky-600">404</p>
      <div class="mt-4">
        <base-title size="3xl" no-leading tight>Page Not Found</base-title>
      </div>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          :to="{ name: 'home' }"
          class="text-sm font-semibold text-gray-900 flex items-center space-x-2"
        >
          <span aria-hidden="true" class="mt-0.5 block">&larr;</span>
          <span>Go Back</span>
        </router-link>
      </div>
    </div>
  </main>
</template>
