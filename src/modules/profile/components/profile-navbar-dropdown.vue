<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import AuthLogoutConfirm from 'src/modules/auth/components/auth-logout-confirm.vue';
import Avatar from 'src/assets/avatar.png';
import { computed, h, ref } from 'vue';
import { useAuthStore } from 'src/modules/auth/auth.store';

const authStore = useAuthStore();

const visibleConfirm = ref(false);
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
      to: { name: 'profile' },
    },
    {
      id: 'logout',
      name: 'Logout',
      onClick: handleLogout,
    },
  ];
});

function handleLogout() {
  visibleConfirm.value = true;
}
</script>

<template>
  <base-dropdown :options="profileDropdownOptions" position="right">
    <template #toggle="{ toggle }">
      <base-button
        color="transparent-white"
        size="rounded-sm"
        v-on:click="toggle"
      >
        <img
          class="w-8 h-8 rounded-full"
          :src="authStore.me.photo_url ?? Avatar"
        />
      </base-button>
    </template>
  </base-dropdown>
  <auth-logout-confirm v-model:visible="visibleConfirm" />
</template>
