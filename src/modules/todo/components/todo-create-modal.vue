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

const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits<{
  'update:visible': [value: boolean];
  created: [];
}>();

const message = useMessage();
const { loading, save } = useCreateResource('todos');

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

async function validate() {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((errors) => {
      if (errors) {
        message.error('Please fill out the form');

        reject(errors);
      } else {
        resolve(true);
      }
    });
  });
}

function handleVisible() {
  form.name = null;
  form.due_at = null;
}
async function handleSave() {
  try {
    await validate();
    await save(form);

    handleSuccess();
  } catch (err) {
    //
  }
}
function handleSuccess() {
  message.success('Todo saved');

  visible.value = false;

  emit('created');
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
