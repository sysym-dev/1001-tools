<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseDescriptionColumn from 'src/components/base/base-description-column.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useAuthStore } from 'src/modules/auth/auth.store';

const authStore = useAuthStore();

const columns = [
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'email',
    name: 'Email',
  },
];
</script>

<template>
  <base-heading title="Profile">
    <template #actions>
      <base-button color="sky">Edit Profile</base-button>
    </template>
  </base-heading>
  <base-description-column :columns="columns" :data="authStore.me" />
</template>
