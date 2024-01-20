<script setup>
import BaseNotification from 'src/components/base/base-notification.vue';
import { inject, ref } from 'vue';

const emitter = inject('emitter');

const items = ref([]);

emitter.on('create-notification', (data) => {
  const id = items.value.length + 1;

  items.value.push({
    id,
    ...data,
  });

  setTimeout(() => {
    const index = items.value.findIndex((item) => item.id === id);

    items.value.splice(index, 1);
  }, 2000);
});
</script>

<template>
  <base-notification :items="items" />
</template>
