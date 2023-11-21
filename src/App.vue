<script setup lang="ts">
import LayoutApp from './components/layouts/layout-app.vue';
import { NDialogProvider, NMessageProvider } from 'naive-ui';
</script>

<template>
  <layout-app>
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </layout-app>
</template>
