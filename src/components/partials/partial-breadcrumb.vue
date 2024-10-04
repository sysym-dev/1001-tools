<script setup>
import { useRoute } from 'vue-router';
import { ChevronRight as ArrowRightIcon } from '@vicons/tabler';

const route = useRoute();
</script>

<template>
  <nav v-if="route.meta.withBreadcrumbs ?? true">
    <ul class="flex items-center gap-x-4 text-gray-900">
      <li>
        <router-link :to="{ name: 'index' }"> Tools </router-link>
      </li>
      <li>
        <arrow-right-icon class="w-4 h-4 text-gray-400" />
      </li>
      <template
        v-for="breadcrumb in route.meta.breadcrumbs"
        :key="breadcrumb.id"
      >
        <li>
          <router-link :to="{ name: breadcrumb.id }">
            {{ breadcrumb.name }}
          </router-link>
        </li>
        <li>
          <arrow-right-icon class="w-4 h-4 text-gray-400" />
        </li>
      </template>
      <li>
        <span class="text-gray-400">{{
          route.meta.breadcrumbTitle ?? route.meta.title
        }}</span>
      </li>
    </ul>
  </nav>
</template>
