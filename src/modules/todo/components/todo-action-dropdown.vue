<script setup lang="ts">
import {
  NButton,
  NIcon,
  NDropdown,
  DropdownOption,
  useDialog,
  useMessage,
} from 'naive-ui';
import { MoreHorizontal16Regular } from '@vicons/fluent';
import { Todo } from '../todo.entity';
import { useDeleteResource } from 'src/common/resource/composes/delete-resource.compose';

const props = defineProps<{
  todo: Todo;
}>();
const emit = defineEmits<{
  edit: [];
  deleted: [];
}>();

const dialog = useDialog();
const message = useMessage();
const { del } = useDeleteResource('todos');

const options: DropdownOption[] = [
  {
    key: 'edit',
    label: 'Edit',
  },
  {
    key: 'delete',
    label: 'Delete',
  },
];

function handleSelect(key: string) {
  if (key === 'edit') {
    emit('edit');
  } else if (key === 'delete') {
    dialog.warning({
      title: 'Confirm',
      content: 'Are you sure?',
      positiveText: 'Yes, sure',
      negativeText: 'Cancel',
      onPositiveClick: async () => await handleDelete(),
    });
  }
}
async function handleDelete() {
  try {
    await del(props.todo.id);
    handleSuccess();

    return true;
  } catch (err) {
    return false;
  }
}
function handleSuccess() {
  message.success('Todo deleted');

  emit('deleted');
}
</script>

<template>
  <n-dropdown
    :options="options"
    trigger="click"
    placement="bottom-end"
    v-on:select="handleSelect"
  >
    <n-button quaternary size="small">
      <template #icon>
        <n-icon>
          <more-horizontal-16-regular />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>
