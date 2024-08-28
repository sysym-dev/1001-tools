<script setup>
import BaseInput from 'src/components/base/base-input/base-input.vue';
import BaseButton from 'src/components/base/base-button/base-button.vue';
import { reactive, ref } from 'vue';
import { useValidation } from 'src/core/validation/validation.compose';
import { ValidationError } from 'src/core/validation/validation.error';
import { request } from 'src/core/request/request';
import { RequestError } from 'src/core/request/request.error';
import { useAuthStore } from 'src/features/auth/stores/auth.store';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';

const router = useRouter();
const authStore = useAuthStore();
const { validate } = useValidation(
  object({
    email: string().required(),
    password: string().required(),
  }),
);

const form = reactive({
  email: '',
  password: '',
});
const isLoading = ref(false);
const errors = ref({
  email: null,
  password: null,
});
const alert = ref(null);

async function handleSubmit() {
  isLoading.value = true;
  errors.value = {
    email: null,
    password: null,
  };
  alert.value = null;

  try {
    await validate(form);

    const res = await request('/login', {
      method: 'post',
      data: form,
    });

    authStore.login(res.data);

    router.push({ name: 'home' });
  } catch (err) {
    if (err instanceof ValidationError) {
      errors.value = err.details;
    } else if (err instanceof RequestError) {
      alert.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <form id="login" v-on:submit.prevent="handleSubmit">
    <p v-if="alert" id="alert">{{ alert }}</p>
    <base-input
      id="email"
      type="email"
      :has-message="!!errors.email"
      :message="errors.email"
      v-model="form.email"
    />
    <base-input
      id="password"
      type="password"
      :has-message="!!errors.password"
      :message="errors.password"
      v-model="form.password"
    />
    <base-button type="submit" :is-loading="isLoading">Login</base-button>
  </form>
</template>
