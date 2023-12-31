<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import WithState from 'src/components/composes/with-state.vue';
import { computed, nextTick, ref, inject } from 'vue';
import { object, string } from 'yup';
import { useForm } from 'src/composes/form.compose';
import { useRequest } from 'src/composes/request.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  values: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:visible']);
const emitter = inject('emitter');

const { form, errors, hasError, resetError, resetForm, setForm, submit } =
  useForm({
    schema: {
      task_category_id: '',
      description: '',
      name: '',
    },
    validationSchema: object({
      task_category_id: string().required(),
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
} = useRequest('/tasks', {
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

const inputEl = ref();

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  resetForm();
  resetError();
  resetRequestError();

  setForm({
    name: props.values.name ?? '',
    description: props.values.name ?? '',
    task_category_id: props.values.task_category_id ?? '',
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

    emitter.emit('tasks-created');
    visible.value = false;
  } catch (err) {
    //
  }
}
</script>

<template>
  <base-modal v-model:visible="visible" v-on:open="handleOpenModal">
    <form v-on:submit.prevent="handleSubmit">
      <base-card title="New Task" v-on:click-outside="handleClose">
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
