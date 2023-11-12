<script setup lang="ts">
import {
  NButton,
  NIcon,
  NDropdown,
  DropdownRenderOption,
  NInput,
  NFormItem,
  NForm,
  FormInst,
  useMessage,
  FormRules,
} from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import { h, ref, reactive } from 'vue';
import { useValidation } from 'src/common/form/composes/validation.compose';
import { useCreateResource } from 'src/common/resource/composes/create-resource.compose';
import { Todo } from '../todo.entity';
import { parseDate } from 'src/utils/date';
import { inject } from 'vue';
import { Emitter } from 'mitt';

const emit = defineEmits<{
  created: [];
}>();

const emitter = inject('emitter') as Emitter<{
  'todo-created': any;
}>;
const { validate } = useValidation();
const { loading, save } = useCreateResource<Todo>('todos');
const message = useMessage();

const visible = ref(false);
const formRef = ref<FormInst | null>(null);
const values = reactive<{
  name: string | null;
}>({
  name: null,
});

const rules: FormRules = {
  name: {
    required: true,
    type: 'string',
  },
};

const form: DropdownRenderOption[] = [
  {
    key: 'form',
    type: 'render',
    render: () =>
      h('div', { style: 'padding: 8px; 12px' }, [
        h(
          NForm,
          { ref: formRef, model: values, rules },
          {
            default: () =>
              h(
                NFormItem,
                { showLabel: false, showFeedback: false, path: 'name' },
                {
                  default: () =>
                    h(NInput, {
                      loading: loading.value,
                      placeholder: 'Enter to save',
                      onKeydown: handleKeydown,
                      value: values.name,
                      onUpdateValue: (value) => (values.name = value),
                    }),
                },
              ),
          },
        ),
      ]),
  },
];

async function submit() {
  try {
    await validate(formRef.value as FormInst);
    await save({
      name: values.name as string,
      due_at: parseDate(new Date()).endOf('d').toISOString(),
    });

    handleSuccess();
  } catch (err) {}
}

function handleSuccess() {
  values.name = null;

  message.success('Todo created');

  visible.value = false;

  emit('created');
  emitter.emit('todo-created', null);
}
function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Enter') {
    submit();
  }
}
function handleVisible() {
  values.name = null;

  formRef.value?.restoreValidation();

  visible.value = true;
}
</script>

<template>
  <n-dropdown
    :show="visible"
    :options="form"
    trigger="click"
    placement="bottom-start"
    v-on:clickoutside="visible = false"
  >
    <n-button text type="primary" v-on:click="handleVisible">
      <template #icon>
        <n-icon>
          <add-12-regular />
        </n-icon>
      </template>
      New Todo
    </n-button>
  </n-dropdown>
</template>
