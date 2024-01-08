<script setup>
import BaseConfirm from 'src/components/base/base-confirm.vue';
import { computed } from 'vue';
import { useAuthStore } from 'src/modules/auth/auth.store';
import { useRouter } from 'vue-router';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'close', 'deleted']);

const authStore = useAuthStore();
const router = useRouter();

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

async function handleConfirm() {
  authStore.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <base-confirm
    title="Logout"
    description="Are you sure want to logout from your account?"
    type="error"
    action="Logout"
    cancelable
    v-model:visible="visible"
    v-on:confirm="handleConfirm"
  />
</template>
