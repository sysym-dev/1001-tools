<script setup>
import BaseModal from 'src/core/components/base/base-modal.vue';
import BaseCard from 'src/core/components/base/base-card.vue';
import BaseInput from 'src/core/components/base/base-input.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseDatepicker from 'src/core/components/base/base-datepicker.vue';
import WithState from 'src/components/composes/with-state.vue';
import TaskCategorySelect from 'src/modules/task-category/components/task-category-select.vue';
import { computed, inject, nextTick, ref } from 'vue';
import { object, string, date } from 'yup';
import { useForm } from 'src/composes/form.compose';
import { useRequest } from 'src/composes/request.compose';
import { createDate } from 'src/utils/date';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object,
    default: () => ({}),
  },
  elements: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:visible', 'close']);
const emitter = inject('emitter');

const {
  isLoading,
  isError,
  error,
  resetError: resetRequestError,
  request,
} = useRequest('/tasks', {
  method: 'patch',
});
const { form, errors, hasError, setForm, resetError, resetForm, submit } =
  useForm({
    schema: {
      task_category_id: '',
      description: '',
      due_at: null,
      name: '',
    },
    validationSchema: object({
      task_category_id: string().required(),
      description: string().nullable().optional(),
      due_at: date().optional().nullable(),
      name: string().required(),
    }),
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
  resetRequestError();
  resetForm();
  resetError();

  setForm({
    name: props.task.name,
    due_at: props.task.due_at ?? null,
    description: props.task.description,
    task_category_id: props.task.TaskCategory?.id ?? '',
  });

  await nextTick();

  inputEl.value.inputEl.focus();
}
async function handleSubmit() {
  try {
    await submit();
    await request({
      url: `/tasks/${props.task.id}`,
      data: {
        ...form.value,
        due_at: form.value.due_at
          ? createDate(form.value.due_at).startOf('d')
          : null,
      },
    });

    visible.value = false;

    emitter.emit('tasks-updated');
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
      <base-card title="Edit Task" v-on:click-outside="handleClose">
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

            <base-datepicker
              label="Due At"
              placeholder="Due At"
              :state="hasError('due_at') ? 'error' : 'normal'"
              :message="hasError('due_at') ? errors.due_at : ''"
              v-model="form.due_at"
            />

            <base-input
              label="Description"
              placeholder="Description"
              :state="hasError('description') ? 'error' : 'normal'"
              :message="hasError('description') ? errors.description : ''"
              textarea
              v-model="form.description"
            />

            <task-category-select
              v-if="elements.task_category_id !== false"
              :state="hasError('task_category_id') ? 'error' : 'normal'"
              :message="
                hasError('task_category_id') ? errors.task_category_id : ''
              "
              :filter="{
                search: task.TaskCategory.name,
              }"
              v-model="form.task_category_id"
            />
          </with-state>
        </div>

        <template #footer>
          <div class="flex gap-x-2 items-center justify-end">
            <base-button
              type="submit"
              color="sky"
              :disabled="isLoading"
              :loading="isLoading"
              >Save</base-button
            >
            <base-button v-on:click="handleClose">Cancel</base-button>
          </div>
        </template>
      </base-card>
    </form>
  </base-modal>
</template>
