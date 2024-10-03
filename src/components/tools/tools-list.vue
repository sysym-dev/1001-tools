<script setup>
import { ArrowsLeftRight } from '@vicons/tabler';

const props = defineProps({
  tag: String,
});

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
    <template v-if="tag">
      <ul class="space-y-1">
        <li
          v-for="menu in menus.find((item) => item.id === tag).children"
          :key="menu.id"
        >
          <router-link
            :to="menu.id"
            class="hover:underline flex items-center gap-x-2"
          >
            <component :is="menu.icon" class="w-4 h-4" />
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <template v-for="menu in menus" :key="menu.id">
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
      </template>
    </template>
  </nav>
</template>
