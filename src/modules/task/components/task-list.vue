<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const tasks = [
  {
    id: 1,
    name: 'Cek KHS UTS',
    date: new Date(),
  },
  {
    id: 2,
    name: 'Tidur Setelar Asar',
    date: new Date(),
  },
  {
    id: 3,
    name: 'Play DLS',
    date: new Date(),
  },
  {
    id: 4,
    name: 'Nonton Siti',
    date: new Date(),
  },
];
</script>

<template>
  <div>
    <base-heading title="Today Todo" />

    <ul class="divide-y divide-gray-100">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between gap-x-6 py-5"
      >
        <div class="min-w-0">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ task.name }}
          </p>
          <div
            class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
          >
            <p class="whitespace-nowrap">
              Due on <time datetime="2023-03-17T00:00Z">today</time>
            </p>
          </div>
        </div>
        <base-button size="sm">
          Todo
          <template #append>
            <ChevronDownIcon class="w-4 h-4" />
          </template>
        </base-button>
      </li>
    </ul>

    <base-button fullwidth>See All</base-button>
  </div>
</template>
