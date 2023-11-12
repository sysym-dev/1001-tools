<script setup lang="ts">
import {
  NSpace,
  NFormItem,
  NInput,
  NModal,
  NButton,
  NDatePicker,
  NForm,
  FormRules,
  useMessage,
  FormInst,
} from 'naive-ui';
import { ref } from 'vue';
import { computed, reactive } from 'vue';
import { useCreateResource } from 'src/common/resource/composes/create-resource.compose';
import { Todo } from '../todo.entity';
import { fromTimestamp } from 'src/utils/date';
import { useValidation } from 'src/common/form/composes/validation.compose';
import { inject } from 'vue';
import { Emitter } from 'mitt';

const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits<{
  'update:visible': [value: boolean];
  created: [];
}>();

const emitter = inject('emitter') as Emitter<{
  'todo-created': any;
}>;
const message = useMessage();
const { loading, save } = useCreateResource<Todo>('todos');
const { validate } = useValidation();

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
  form.name = null;
  form.due_at = null;
}
async function handleSave() {
  try {
    await validate(formRef.value as FormInst);
    await save({
      name: form.name as string,
      due_at: fromTimestamp(form.due_at as number)
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

  emit('created');

  emitter.emit('todo-created', []);
}
</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    style="width: 600px"
    title="New Todo"
    v-on:after-enter="handleVisible"
  >
    <n-form ref="formRef" :model="form" :rules="rules">
      <n-form-item label="Name" path="name">
        <n-input placeholder="Name" v-model:value="form.name" />
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
        <n-button type="primary" :loading="loading" v-on:click="handleSave"
          >Save</n-button
        >
        <n-button v-on:click="visible = false">Cancel</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
