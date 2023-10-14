<script setup lang="ts">
import { NSpace, NFormItem, NInput, NModal, NButton } from 'naive-ui';
import { computed, reactive } from 'vue';
import { Todo } from 'src/modules/todo/todo.types';

const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});
const form = reactive<Partial<Todo>>({
  name: '',
});

function handleVisible() {
  //   form.name = props.todo?.name as string;
}
</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    style="width: 600px"
    title="Create Modal"
    v-on:after-enter="handleVisible"
  >
    <n-form-item label="Name" :show-feedback="false">
      <n-input v-model:value="form.name" />
    </n-form-item>

    <template #footer>
      <n-space>
        <n-button type="primary">Save</n-button>
        <n-button v-on:click="visible = false">Cancel</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
