<script setup>
import { ArrowsLeftRight } from '@vicons/tabler';

const menus = [
  {
    id: 'json',
    name: 'JSON',
    children: [
      { id: 'json-to-toml', name: 'JSON to TOML', icon: ArrowsLeftRight },
    ],
  },
];
</script>

<template>
  <nav>
    <div v-for="menu in menus" :key="menu.id">
      <div class="space-y-2 divide-y">
        <p class="text-lg font-medium">{{ menu.name }}</p>
        <ul class="space-y-1 pt-2">
          <li v-for="childMenu in menu.children" :key="childMenu.id">
            <router-link
              :to="childMenu.id"
              class="hover:underline flex items-center gap-x-2"
            >
              <component :is="childMenu.icon" class="w-4 h-4" />
              {{ childMenu.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
