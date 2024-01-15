<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useTitle } from 'src/composes/title.compose';
import { useRequest } from 'src/composes/request.compose';
import { useAuthStore } from 'src/modules/auth/auth.store';

const { setTitle } = useTitle();
const { request, data: me } = useRequest('/me');
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

async function loadMe() {
  try {
    await request();

    authStore.setMe(me.value.data);
  } catch (err) {
    //
  }
}

router.afterEach((to) => {
  setTitle(to.meta.title);
});

if (authStore.isLoggedIn) {
  loadMe();
}
</script>

<template>
  <component :is="route.meta.layout" />
</template>
