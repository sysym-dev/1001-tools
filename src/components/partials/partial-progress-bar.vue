<script setup>
import { getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { $Progress } = getCurrentInstance().appContext.config.globalProperties;
const router = useRouter();

$Progress.start();

router.beforeEach(() => {
  $Progress.start();
});

router.afterEach(() => {
  $Progress.finish();
});

onMounted(() => {
  $Progress.finish();
});
</script>

<template>
  <vue-progress-bar />
</template>
