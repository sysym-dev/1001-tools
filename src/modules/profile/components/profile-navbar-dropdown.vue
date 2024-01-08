<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { computed, h } from 'vue';
import { useAuthStore } from 'src/modules/auth/auth.store';

const authStore = useAuthStore();

const profileDropdownOptions = computed(() => {
  return [
    {
      id: 'me',
      name: 'Me',
      component: (options) =>
        h('div', { class: [options.classes.option, 'hover:bg-white'] }, [
          h('p', {}, authStore.me.name),
          h('p', { class: 'text-xs text-gray-500' }, authStore.me.email),
        ]),
      hasDivider: true,
    },
    {
      id: 'profile',
      name: 'Profile',
    },
    {
      id: 'setting',
      name: 'Setting',
      hasDivider: true,
    },
    {
      id: 'logout',
      name: 'Logout',
    },
  ];
});
</script>

<template>
  <base-dropdown :options="profileDropdownOptions" position="right">
    <template #toggle="{ toggle }">
      <base-button
        color="transparent-white"
        size="square-md"
        v-on:click="toggle"
      >
        <user-circle-icon class="block h-6 w-6" />
      </base-button>
    </template>
  </base-dropdown>
</template>
