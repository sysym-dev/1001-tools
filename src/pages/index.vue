<script setup>
import BaseCard from 'src/components/base-card.vue';
import { ArrowsLeftRight } from '@vicons/tabler';

const menus = [
  { id: 'json-to-toml', name: 'JSON to TOML', icon: ArrowsLeftRight },
];
</script>

<template>
  <base-card>
    <nav>
      <ul class="space-y-1">
        <li v-for="menu in menus" :key="menu.id">
          <router-link
            :to="menu.id"
            class="hover:underline flex items-center gap-x-2"
          >
            <component :is="menu.icon" class="w-4 h-4" />
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </base-card>
</template>
