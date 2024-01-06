<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseLink from 'src/components/base/base-link.vue';
</script>

<template>
  <form class="px-4 py-20 min-w-full sm:px-0 sm:min-w-[400px] space-y-6">
    <base-title centered>Register New Account</base-title>
    <div class="space-y-4">
      <base-input label="Name" placeholder="Name" />
      <base-input label="Email" placeholder="Email" type="email" />
      <base-input label="Password" placeholder="Password" type="password" />
      <base-button fullwidth color="sky">Login</base-button>
      <p class="text-sm text-center text-gray-500">
        Already have account?
        <base-link :to="{ name: 'login' }">Login Here</base-link>
      </p>
    </div>
  </form>
</template>
