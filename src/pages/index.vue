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
  <div class="space-y-6">
    <header class="space-y-4 py-0">
      <h1 class="font-bold text-4xl tracking-tight">1001 Tools</h1>
      <input
        type="text"
        placeholder="Search Tools"
        class="w-full border-gray-200"
        autofocus
      />
    </header>
    <hr />
    <nav>
      <div v-for="menu in menus" :key="menu.id">
        <div class="space-y-2">
          <p class="text-lg font-bold">{{ menu.name }}</p>
          <ul class="space-y-1">
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
  </div>
</template>
