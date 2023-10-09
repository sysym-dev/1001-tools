<script setup lang="ts">
import LayoutApp from './components/layouts/layout-app.vue';
import { NDialogProvider } from 'naive-ui';
</script>

<template>
  <layout-app>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </layout-app>
</template>
