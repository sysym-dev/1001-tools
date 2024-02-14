<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { reactive, ref } from 'vue';
import { validateSchema } from 'src/core/validation/validate-schema';
import { ValidationError } from 'src/core/validation/validation-error';

const form = reactive({
  email: '',
  password: '',
});
const isLoading = ref(false);
const errors = ref({
  email: null,
  password: null,
});

async function handleSubmit() {
  isLoading.value = true;

  try {
    await validateSchema(form);
  } catch (err) {
    if (err instanceof ValidationError) {
      errors.value = err.details;
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <form id="login" v-on:submit="handleSubmit">
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
