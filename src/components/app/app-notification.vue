<script setup>
import BaseNotification from 'src/components/base/base-notification.vue';
import { inject, ref } from 'vue';

const emitter = inject('emitter');

const items = ref([]);

emitter.on('create-notification', (data) => {
  const index = items.value.push(data);

  setTimeout(() => {
    items.value.splice(index - 1, 1);
  }, 3000);
});
</script>

<template>
  <base-notification :items="items" />
</template>
