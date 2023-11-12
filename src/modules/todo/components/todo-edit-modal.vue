<script setup lang="ts">
import {
  NSpace,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NButton,
  NDatePicker,
  FormRules,
  FormInst,
  useMessage,
} from 'naive-ui';
import { computed, reactive, ref } from 'vue';
import { Todo } from 'src/modules/todo/todo.entity';
import { parseDate } from 'src/utils/date';
import { useValidation } from 'src/common/form/composes/validation.compose';
import { useUpdateResource } from 'src/common/resource/composes/update-resource.compose';
import { inject } from 'vue';
import { Emitter } from 'mitt';

const props = defineProps<{
  visible: boolean;
  todo: Todo | null;
}>();
const emit = defineEmits<{
  'update:visible': [value: boolean];
  updated: [];
}>();

const emitter = inject('emitter') as Emitter<{
  'todo-updated': any;
}>;
const { validate } = useValidation();
const { loading, save } = useUpdateResource<Todo>('todos');
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});
const form = reactive<{
  name: string | null;
  due_at: number | null;
}>({
  name: null,
  due_at: null,
});
const rules: FormRules = {
  name: {
    required: true,
    type: 'string',
    trigger: 'blur',
  },
  due_at: {
    required: true,
    type: 'date',
    trigger: 'blur',
  },
};

function handleVisible() {
  form.name = props.todo?.name as string;
  form.due_at = parseDate(props.todo?.due_at as string).valueOf();
}
async function handleSave() {
  try {
    await validate(formRef.value as FormInst);
    await save(props.todo?.id as number, {
      name: form.name as string,
      due_at: parseDate(form.due_at as number)
        .endOf('d')
        .toISOString(),
    });

    handleSuccess();
  } catch (err) {
    //
  }
}
function handleSuccess() {
  message.success('Todo saved');

  visible.value = false;

  emit('updated');
  emitter.emit('todo-updated', null);
}
</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    style="width: 600px"
    title="Edit Modal"
    v-on:after-enter="handleVisible"
  >
    <n-form ref="formRef" :rules="rules" :model="form">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="form.name" />
      </n-form-item>
      <n-form-item label="Due At" path="due_at">
        <n-date-picker
          :style="{ width: '100%' }"
          placement="bottom-start"
          clearable
          v-model:value="form.due_at"
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <n-space>
        <n-button :loading="loading" type="primary" v-on:click="handleSave"
          >Save</n-button
        >
        <n-button v-on:click="visible = false">Cancel</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
