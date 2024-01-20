<script setup>
import BaseModal from 'src/core/components/base/base-modal.vue';
import BaseCard from 'src/core/components/base/base-card.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { computed, nextTick, ref } from 'vue';
import { object, string } from 'yup';
import { useForm } from 'src/core/composes/form.compose';
import { useRequest } from 'src/core/request/request.compose';
import { useAuthStore } from 'src/modules/auth/auth.store';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const authStore = useAuthStore();
const { form, errors, hasError, resetError, resetForm, setForm, submit } =
  useForm({
    schema: {
      name: null,
    },
    validationSchema: object({
      name: string().required(),
    }),
  });
const {
  isError,
  error,
  request,
  resetError: resetRequestError,
  isLoading,
  data: result,
} = useRequest('/me', {
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

const inputEl = ref();

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  resetForm();
  resetError();
  resetRequestError();

  setForm({
    name: authStore.me.name,
  });

  await nextTick();

  inputEl.value.inputEl.focus();
}
async function handleSubmit() {
  try {
    resetRequestError();

    await submit();
    await request({
      data: form.value,
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
      <base-card title="Edit Profile" v-on:click-outside="handleClose">
        <div class="space-y-4">
          <with-state
            :is-error="isError"
            :error-message="isError ? error.message : null"
          >
            <base-input
              ref="inputEl"
              label="Name"
              placeholder="Name"
              :state="hasError('name') ? 'error' : 'normal'"
              :message="hasError('name') ? errors.name : ''"
              v-model="form.name"
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
