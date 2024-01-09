<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseDescriptionColumn from 'src/components/base/base-description-column.vue';
import BaseButton from 'src/components/base/base-button.vue';
import ProfileEditModal from 'src/modules/profile/components/profile-edit-modal.vue';
import { useAuthStore } from 'src/modules/auth/auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const visibleEditModal = ref(false);

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

function handleEdit() {
  visibleEditModal.value = true;
}
</script>

<template>
  <base-heading title="Profile">
    <template #actions>
      <base-button color="sky" v-on:click="handleEdit"
        >Edit Profile</base-button
      >
    </template>
  </base-heading>
  <base-description-column :columns="columns" :data="authStore.me" />
  <profile-edit-modal v-model:visible="visibleEditModal" />
</template>
