<script setup>
import { ArrowsLeftRight } from '@vicons/tabler';
import { computed } from 'vue';

const props = defineProps({
  tag: String,
  search: String,
});

const menus = [
  {
    id: 'json',
    name: 'JSON',
    childrenNames: ['JSON to TOML'],
    children: [
      { id: 'json-to-toml', name: 'JSON to TOML', icon: ArrowsLeftRight },
    ],
  },
];

const filteredMenus = computed(() => {
  if (!props.search) {
    return menus;
  }

  return menus
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(props.search) ||
        item.childrenNames.some((name) =>
          name.toLowerCase().includes(props.search),
        )
      );
    })
    .map((item) => {
      return {
        ...item,
        children: item.children.filter((child) =>
          child.name.toLowerCase().includes(props.search),
        ),
      };
    });
});
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
      <p v-if="!filteredMenus.length" class="text-gray-500">No Tools Found</p>
      <template v-else>
        <template v-for="menu in filteredMenus" :key="menu.id">
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
    </template>
  </nav>
</template>
