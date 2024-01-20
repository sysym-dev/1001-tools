<script setup>
import BaseModal from 'src/core/components/base/base-modal.vue';
import BaseCard from 'src/core/components/base/base-card.vue';
import BaseUploadFile from 'src/core/components/base/base-upload-file.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { computed, ref } from 'vue';
import { useRequest } from 'src/core/composes/request.compose';
import { useAuthStore } from 'src/modules/auth/auth.store';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const authStore = useAuthStore();
const {
  isError,
  error,
  request,
  resetError: resetRequestError,
  isLoading,
  data: result,
} = useRequest('/me/photo', {
  method: 'patch',
  multipart: true,
});

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});
const photo = ref();
const errorMesage = computed(() => {
  if (error.value.type !== 'Network Error') {
    return error.value.message;
  }

  if (error.value.data.status !== 422) {
    return error.value.message;
  }

  return error.value.data.data.details.photo;
});

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  photo.value = null;

  resetRequestError();
}
async function handleSubmit() {
  try {
    resetRequestError();

    await request({
      data: {
        photo: photo.value,
      },
    });

    authStore.setMe(result.value.data);

    visible.value = false;
  } catch (err) {
    //
  }
}
</script>

<template>
  <base-modal v-model:visible="visible" v-on:open="handleOpenModal">
    <form v-on:submit.prevent="handleSubmit">
      <base-card title="Change Photo Profile" v-on:click-outside="handleClose">
        <div class="space-y-4">
          <with-state
            :is-error="isError"
            :error-message="isError ? errorMesage : null"
          >
            <base-upload-file with-label label="Upload Photo" v-model="photo" />
          </with-state>
        </div>

        <template #footer>
          <div class="flex gap-x-2 items-center justify-end">
            <base-button
              :loading="isLoading"
              :disabled="isLoading"
              type="submit"
              color="sky"
              >Save</base-button
            >
            <base-button v-on:click="handleClose">Cancel</base-button>
          </div>
        </template>
      </base-card>
    </form>
  </base-modal>
</template>
