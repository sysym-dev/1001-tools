<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseDescriptionColumn from 'src/components/base/base-description-column.vue';
import BaseButton from 'src/components/base/base-button.vue';
import ProfileEditModal from 'src/modules/profile/components/profile-edit-modal.vue';
import ProfileResetPasswordModal from 'src/modules/profile/components/profile-reset-password-modal.vue';
import ProfileChangePhotoModal from 'src/modules/profile/components/profile-change-photo-modal.vue';
import { useAuthStore } from 'src/modules/auth/auth.store';
import { h, ref } from 'vue';

const authStore = useAuthStore();

const visibleEditModal = ref(false);
const visibleResetPasswordModal = ref(false);
const visibleChangePhotoModal = ref(false);

const columns = [
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'email',
    name: 'Email',
  },
  {
    id: 'photo_url',
    name: 'Photo',
    fullwidth: true,
    type: 'render',
    component: ({ data }) =>
      h('div', { class: 'flex items-center space-x-2' }, [
        h('img', { src: data.photo_url, class: 'w-8 h-8 rounded-full' }),
        h(
          BaseButton,
          { size: 'sm', onClick: handleChangePassword },
          { default: () => 'Change' },
        ),
      ]),
  },
];

function handleEdit() {
  visibleEditModal.value = true;
}
function handleResetPassword() {
  visibleResetPasswordModal.value = true;
}
function handleChangePassword() {
  visibleChangePhotoModal.value = true;
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
  <profile-change-photo-modal v-model:visible="visibleChangePhotoModal" />
</template>
