<script setup lang="ts">
import {
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NIcon,
  NSpace,
  NButton,
  NDropdown,
  DropdownOption,
} from 'naive-ui';
import { RouterLink } from 'vue-router';
import {
  PersonCircle24Regular,
  ChevronDown16Regular,
  ChevronUp16Regular,
} from '@vicons/fluent';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const todoDropdown: DropdownOption[] = [
  {
    key: 'today',
    label: 'Today',
  },
  {
    key: 'late',
    label: 'Late',
  },
  {
    key: 'all',
    label: 'All Todo',
  },
];

const visibleTodoDropdown = ref(false);

function checkIsActive(key: string | string[]): boolean {
  if (Array.isArray(key)) {
    return key.includes(route.name as string);
  }

  return route.name === key;
}

function handleToggleTodoDropdown() {
  visibleTodoDropdown.value = !visibleTodoDropdown.value;
}
function handleCloseTodoDropdown() {
  visibleTodoDropdown.value = false;
}
function handleSelectTodoDropdown(key: string) {
  router.push({ name: key });
}
</script>

<template>
  <n-layout
    content-style="min-height: 100vh; background-color: rgb(250, 250, 252)"
  >
    <n-layout-header bordered>
      <n-layout-content content-style="padding: 12px 24px">
        <n-space justify="space-between">
          <n-space>
            <router-link
              :to="{ name: 'dashboard' }"
              custom
              #="{ href, navigate }"
            >
              <n-button
                :secondary="checkIsActive('dashboard')"
                :quaternary="!checkIsActive('dashboard')"
                :type="checkIsActive('dashboard') ? 'primary' : 'default'"
                tag="a"
                :href="href"
                @click="navigate"
              >
                Dashboard
              </n-button>
            </router-link>
            <n-dropdown
              :options="todoDropdown"
              :show="visibleTodoDropdown"
              @clickoutside="handleCloseTodoDropdown"
              @select="handleSelectTodoDropdown"
            >
              <n-button
                :secondary="checkIsActive(['today', 'late', 'all'])"
                :quaternary="!checkIsActive(['today', 'late', 'all'])"
                :type="
                  checkIsActive(['today', 'late', 'all'])
                    ? 'primary'
                    : 'default'
                "
                icon-placement="right"
                @click="handleToggleTodoDropdown"
              >
                <template #icon>
                  <n-icon>
                    <ChevronUp16Regular v-if="visibleTodoDropdown" />
                    <ChevronDown16Regular v-else />
                  </n-icon>
                </template>
                <span>Todo</span>
              </n-button>
            </n-dropdown>
          </n-space>
          <n-button quaternary>
            <template #icon>
              <n-icon>
                <PersonCircle24Regular />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-layout-content>
    </n-layout-header>
    <n-layout>
      <n-layout-content
        content-style="padding: 24px; background-color: rgb(250, 250, 252)"
      >
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
