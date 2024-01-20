<script setup>
import BaseButton from './base-button.vue';
import ProfileNavbarDropdown from 'src/features/profile/components/profile-navbar-dropdown.vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/features/auth/auth.store';

const props = defineProps({
  menus: {
    type: Array,
    required: true,
  },
  active: String,
});

const router = useRouter();
const authStore = useAuthStore();

const visibleMobileMenu = ref(false);

function checkIsActive(menu) {
  return menu.id === props.active;
}

function handleToggleMobileMenu() {
  visibleMobileMenu.value = !visibleMobileMenu.value;
}

router.afterEach(() => {
  visibleMobileMenu.value = false;
});
</script>

<template>
  <div class="border-b">
    <div class="container px-4 h-16 flex items-center justify-between">
      <!-- Desktop Menu -->
      <div class="hidden space-x-8 h-full sm:flex">
        <router-link
          v-for="menu in menus"
          :key="menu.id"
          :to="menu.to"
          :class="[
            'h-full flex items-center px-1 text-sm font-medium border-b-2',
            checkIsActive(menu)
              ? 'text-gray-900 border-b-2 border-sky-500'
              : 'text-gray-500 border-transparent hover:border-gray-300',
          ]"
        >
          {{ menu.name }}
        </router-link>
      </div>
      <!-- Toggle Mobile Menu -->
      <div class="sm:hidden">
        <base-button
          color="transparent-white"
          size="square-md"
          v-on:click="handleToggleMobileMenu"
        >
          <component
            :is="visibleMobileMenu ? XMarkIcon : Bars3Icon"
            class="block h-6 w-6"
          />
        </base-button>
      </div>
      <!-- Profile Dropdown -->
      <div>
        <profile-navbar-dropdown />
      </div>
    </div>
    <!-- Mobile Menu -->
    <div v-if="visibleMobileMenu" class="sm:hidden">
      <div class="space-y-1 pb-2">
        <router-link
          v-for="menu in menus"
          :key="menu.id"
          :to="menu.to"
          :class="[
            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            checkIsActive(menu)
              ? 'border-sky-500 bg-sky-50 text-sky-700'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
          ]"
        >
          {{ menu.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>
