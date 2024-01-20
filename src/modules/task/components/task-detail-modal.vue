<script setup>
import BaseModal from 'src/core/components/base/base-modal.vue';
import BaseCard from 'src/core/components/base/base-card.vue';
import BaseButton from 'src/core/components/base/base-button.vue';
import BaseDescriptionColumn from 'src/core/components/base/base-description-column.vue';
import TaskStatusDropdown from './task-status-dropdown.vue';
import TaskEditModal from './task-edit-modal.vue';
import TaskDeleteConfirm from './task-delete-confirm.vue';
import WithState from 'src/core/components/base/base-state.vue';
import { computed, ref } from 'vue';
import { useRequest } from 'src/core/composes/request.compose';
import { date } from 'src/utils/date';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  taskId: null,
  editElements: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:visible']);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  },
});

const {
  isLoading,
  isError,
  error,
  data: task,
  request,
} = useRequest('/tasks', {
  initData: {
    data: {},
  },
});

const visibleEditModal = ref(false);
const visibleDeleteConfirm = ref(false);
const columns = [
  {
    id: 'status',
    name: 'Status',
    type: 'render',
  },
  {
    id: 'category',
    name: 'Category',
    value: (task) => task.TaskCategory?.name,
  },
  {
    id: 'due_at',
    name: 'Due At',
    fullwidth: true,
    value: (task) => (task.due_at ? date(task.due_at).fromNow() : 'No Due'),
  },
  {
    id: 'description',
    name: 'Description',
    fullwidth: true,
    value: (task) => task.description || '-',
  },
];

async function loadTask() {
  try {
    await request({
      url: `/tasks/${props.taskId}`,
      params: {
        include: ['TaskCategory'],
      },
    });
  } catch {}
}

function handleClose() {
  visible.value = false;
}
function handleEdit() {
  visibleEditModal.value = true;
  visible.value = false;
}
function handleDelete() {
  visibleDeleteConfirm.value = true;
  visible.value = false;
}
function handleCloseEditModal() {
  visible.value = true;
}
function handleCloseDeleteConfirm() {
  visible.value = true;
}
function handleOpen() {
  loadTask();
}
function handleDeleted() {
  visible.value = false;
}
</script>

<template>
  <base-modal size="md" v-model:visible="visible" v-on:open="handleOpen">
    <base-card
      :title="task.data.name"
      :classes="{ body: 'p-0' }"
      :body-no-padding="!isLoading && !isError"
      :with-header="!isLoading && !isError"
      v-on:click-outside="handleClose"
    >
      <with-state
        :is-loading="isLoading"
        is-loading-blocking
        is-error-blocking
        :is-error="isError"
        :error-message="isError ? error.message : null"
      >
        <base-description-column
          :columns="columns"
          :data="task.data"
          custom-padding="px-4 py-5 sm:px-6"
        >
          <template #render>
            <div>
              <task-status-dropdown
                :task-id="task.data.id"
                v-model="task.data.status"
              />
            </div>
          </template>
        </base-description-column>
      </with-state>

      <template #footer>
        <div class="flex items-center justify-between gap-x-2">
          <div class="flex items-center gap-x-2">
            <template v-if="!isLoading && !isError">
              <base-button color="sky" v-on:click="handleEdit"
                >Edit</base-button
              >
              <base-button color="red" v-on:click="handleDelete"
                >Delete</base-button
              >
            </template>
          </div>
          <base-button v-on:click="handleClose">Close</base-button>
        </div>
      </template>
    </base-card>
  </base-modal>

  <task-edit-modal
    :task="task.data"
    :elements="editElements"
    v-model:visible="visibleEditModal"
    v-on:close="handleCloseEditModal"
  />
  <task-delete-confirm
    :task-id="task.data.id"
    v-model:visible="visibleDeleteConfirm"
    v-on:close="handleCloseDeleteConfirm"
    v-on:deleted="handleDeleted"
  />
</template>
