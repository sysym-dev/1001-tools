<script setup>
import BaseModal from 'src/core/components/base/base-modal.vue';
import BaseCard from 'src/core/components/base/base-card.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { computed, nextTick, ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';
import { useForm } from 'src/composes/form.compose';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const { form, errors, hasError, resetError, resetForm, submit } = useForm({
  schema: {
    password_confirmation: null,
    password: null,
  },
  validationSchema: object({
    password_confirmation: string()
      .required()
      .oneOf([yupRef('password')], "password confirmation doesn't match"),
    password: string().required(),
  }),
});
const {
  isError,
  error,
  request,
  resetError: resetRequestError,
  isLoading,
} = useRequest('/me/password', {
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

const inputPassword = ref();

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  resetForm();
  resetError();
  resetRequestError();

  await nextTick();

  inputPassword.value.inputEl.focus();
}
async function handleSubmit() {
  try {
    resetRequestError();

    await submit();
    await request({
      data: form.value,
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
      <base-card title="Reset Password" v-on:click-outside="handleClose">
        <div class="space-y-4">
          <with-state
            :is-error="isError"
            :error-message="isError ? error.message : null"
          >
            <base-input
              ref="inputPassword"
              label="Password"
              type="password"
              placeholder="Password"
              :state="hasError('password') ? 'error' : 'normal'"
              :message="hasError('password') ? errors.password : ''"
              v-model="form.password"
            />
            <base-input
              label="Password Confirmation"
              type="password"
              placeholder="Password Confirmation"
              :state="hasError('password_confirmation') ? 'error' : 'normal'"
              :message="
                hasError('password_confirmation')
                  ? errors.password_confirmation
                  : ''
              "
              v-model="form.password_confirmation"
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
