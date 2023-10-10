<script setup lang="ts">
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  MenuOption,
  NIcon,
} from 'naive-ui';
import { computed, h } from 'vue';
import { Component } from 'vue';
import {
  MailInbox16Regular,
  Archive16Regular,
  Folder16Regular,
} from '@vicons/fluent';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const menuOptions: MenuOption[] = [
  {
    label: 'Today Todo',
    key: 'today',
    icon: renderIcon(MailInbox16Regular),
  },
  {
    label: 'Late Todo',
    key: 'late',
    icon: renderIcon(Archive16Regular),
  },
  {
    label: 'All Todo',
    key: 'all',
    icon: renderIcon(Folder16Regular),
  },
];
const isCollapsed = ref(false);
const active = computed<string>(() => route.name as string);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
</script>

<template>
  <n-layout has-sider content-style="min-height: 100vh">
    <n-layout-sider
      :bordered="true"
      collapse-mode="width"
      show-trigger
      v-model="isCollapsed"
    >
      <n-menu
        :options="menuOptions"
        :collapsed="isCollapsed"
        :value="active"
      ></n-menu>
    </n-layout-sider>
    <n-layout content-style="padding: 24px" :embedded="true">
      <n-layout-content content-style="padding: 24px">
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
