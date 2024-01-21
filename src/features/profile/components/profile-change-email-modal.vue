<script setup>
import BaseModal from 'src/core/components/base/base-modal.vue';
import BaseCard from 'src/core/components/base/base-card.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { computed, inject, nextTick, ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';
import { useForm } from 'src/core/composes/form.compose';
import { useRequest } from 'src/core/request/request.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);
const emitter = inject('emitter');

const { form, errors, hasError, resetError, resetForm, submit } = useForm({
  schema: {
    email: null,
  },
  validationSchema: object({
    email: string().required().email(),
  }),
});
const {
  isError,
  error,
  request,
  resetError: resetRequestError,
  isLoading,
} = useRequest('/me/email', {
  method: 'patch',
});

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});
const errorMessage = computed(() => {
  if (error.value.type !== 'Network Error') {
    return error.value.message;
  }

  if (error.value.data.status !== 422) {
    return error.value.message;
  }

  return Object.values(error.value.data.data.details)[0];
});

const inputEmail = ref();

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  resetForm();
  resetError();
  resetRequestError();

  await nextTick();

  inputEmail.value.inputEl.focus();
}
async function handleSubmit() {
  try {
    resetRequestError();

    await submit();
    await request({
      data: form.value,
    });

    emitter.emit('create-notification', {
      type: 'notification-success',
      message: 'Email Verification Link Sent',
    });

    visible.value = false;
  } catch (err) {
    //
  }
}
</script>

<template>
  <base-modal v-model:visible="visible" v-on:open="handleOpenModal">
    <form v-on:submit.prevent="handleSubmit">
      <base-card title="Change Email" v-on:click-outside="handleClose">
        <div class="space-y-4">
          <with-state
            :is-error="isError"
            :error-message="isError ? errorMessage : null"
          >
            <base-input
              ref="inputEmail"
              label="Email"
              type="email"
              placeholder="Email"
              :state="hasError('email') ? 'error' : 'normal'"
              :message="hasError('email') ? errors.email : ''"
              v-model="form.email"
            />
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
