<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseDescriptionColumn from 'src/components/base/base-description-column.vue';
import BaseButton from 'src/components/base/base-button.vue';
import ProfileEditModal from 'src/modules/profile/components/profile-edit-modal.vue';
import ProfileResetPasswordModal from 'src/modules/profile/components/profile-reset-password-modal.vue';
import { useAuthStore } from 'src/modules/auth/auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const visibleEditModal = ref(false);
const visibleResetPasswordModal = ref(false);

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
function handleResetPassword() {
  visibleResetPasswordModal.value = true;
}
</script>

<template>
  <base-heading title="Profile">
    <template #actions>
      <div class="space-x-2">
        <base-button v-on:click="handleEdit">Edit Profile</base-button>
        <base-button v-on:click="handleResetPassword"
          >Reset Password</base-button
        >
      </div>
    </template>
  </base-heading>
  <base-description-column :columns="columns" :data="authStore.me" />
  <profile-edit-modal v-model:visible="visibleEditModal" />
  <profile-reset-password-modal v-model:visible="visibleResetPasswordModal" />
</template>
