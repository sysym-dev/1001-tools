<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { computed, nextTick, ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
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

const inputEl = ref();

function handleClose() {
  visible.value = false;
}

async function handleOpenModal() {
  await nextTick();

  inputEl.value.inputEl.focus();
}
</script>

<template>
  <base-modal v-model:visible="visible" v-on:open="handleOpenModal">
    <base-card title="New Task" v-on:click-outside="handleClose">
      <base-input ref="inputEl" label="Name" placeholder="Name" />

      <template #footer>
        <div class="flex gap-x-2 items-center justify-end">
          <base-button color="sky">Save</base-button>
          <base-button v-on:click="handleClose">Cancel</base-button>
        </div>
      </template>
    </base-card>
  </base-modal>
</template>
