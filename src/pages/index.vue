<script setup>
import { ArrowsLeftRight } from '@vicons/tabler';

const menus = [
  { id: 'json-to-yaml', name: 'JSON to YAML', icon: ArrowsLeftRight },
];
</script>

<template>
  <div class="bg-gray-50 min-h-screen text-gray-900">
    <div class="py-24 max-w-screen-md mx-auto space-y-4">
      <header>
        <h1 class="text-3xl font-bold tracking-tight">1001 Tools</h1>
      </header>
      <main class="bg-white p-6 rounded-xl border">
        <nav>
          <ul class="space-y-1">
            <li v-for="menu in menus" :key="menu.id">
              <a href="" class="hover:underline flex items-center gap-x-2">
                <component :is="menu.icon" class="w-4 h-4" />
                {{ menu.name }}
              </a>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  </div>
</template>
