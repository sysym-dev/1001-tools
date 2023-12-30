<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import WithState from 'src/components/composes/with-state.vue';
import { computed, inject, nextTick, ref } from 'vue';
import { object, string } from 'yup';
import { useForm } from 'src/composes/form.compose';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'close']);
const emitter = inject('emitter');

const { form, errors, hasError, resetError, resetForm, submit } = useForm({
  schema: {
    description: '',
    name: '',
  },
  validationSchema: object({
    description: string().optional(),
    name: string().required(),
  }),
});
const {
  isError,
  error,
  request,
  resetError: resetRequestError,
  isLoading,
} = useRequest('/task-categories', {
  method: 'post',
});

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

const inputNameEl = ref();

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  resetForm();
  resetError();
  resetRequestError();

  await nextTick();

  inputNameEl.value.inputEl.focus();
}
async function handleSubmit() {
  try {
    resetRequestError();

    await submit();
    await request({
      data: form.value,
    });

    emitter.emit('task-categories-created');
    visible.value = false;
  } catch (err) {
    //
  }
}
function handleCloseModal() {
  emit('close');
}
</script>

<template>
  <base-modal
    v-model:visible="visible"
    v-on:open="handleOpenModal"
    v-on:close="handleCloseModal"
  >
    <form v-on:submit.prevent="handleSubmit">
      <base-card title="New Category" v-on:click-outside="handleClose">
        <div class="space-y-4">
          <with-state
            :is-error="isError"
            :error-message="isError ? error.message : null"
          >
            <base-input
              ref="inputNameEl"
              label="Name"
              placeholder="Name"
              :state="hasError('name') ? 'error' : 'normal'"
              :message="hasError('name') ? errors.name : ''"
              v-model="form.name"
            />

            <base-input
              label="Description"
              placeholder="Description"
              :state="hasError('description') ? 'error' : 'normal'"
              :message="hasError('description') ? errors.description : ''"
              textarea
              v-model="form.description"
            />
          </with-state>
        </div>

        <template #footer>
          <div class="flex gap-x-2 items-center justify-end">
            <base-button
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
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
