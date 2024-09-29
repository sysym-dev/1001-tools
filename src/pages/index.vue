<script setup>
import { ArrowsLeftRight } from '@vicons/tabler';

const menus = [
  { id: 'json-to-toml', name: 'JSON to TOML', icon: ArrowsLeftRight },
];
</script>

<template>
  <div class="bg-white p-6 rounded-xl border">
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
  </div>
</template>
