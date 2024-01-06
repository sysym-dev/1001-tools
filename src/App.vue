<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useTitle } from 'src/composes/title.compose';

const { setTitle } = useTitle();
const route = useRoute();
const router = useRouter();

router.afterEach((to) => {
  setTitle(to.meta.title);
});
</script>

<template>
  <component :is="route.meta.layout" />
</template>
