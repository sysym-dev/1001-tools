<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { computed, nextTick, ref } from 'vue';
import { object, string } from 'yup';
import { useForm } from 'src/composes/form.compose';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'close']);

const { form, errors, hasError, setForm, resetError, resetForm, submit } =
  useForm({
    schema: {
      name: null,
    },
    validationSchema: object({
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
  resetForm();
  resetError();

  setForm({
    name: 'Turu Bang',
  });

  await nextTick();

  inputEl.value.inputEl.focus();
}
async function handleSubmit() {
  try {
    await submit();
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
        <base-input
          ref="inputEl"
          label="Name"
          placeholder="Name"
          :state="hasError('name') ? 'error' : 'normal'"
          :message="hasError('name') ? errors.name : ''"
          v-model="form.name"
        />

        <template #footer>
          <div class="flex gap-x-2 items-center justify-end">
            <base-button type="submit" color="sky">Save</base-button>
            <base-button v-on:click="handleClose">Cancel</base-button>
          </div>
        </template>
      </base-card>
    </form>
  </base-modal>
</template>
