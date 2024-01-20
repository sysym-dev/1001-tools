<script setup>
import { PhotoIcon } from '@heroicons/vue/24/solid';
import BaseInput from './base-input.vue';
import { computed } from 'vue';

const props = defineProps({
  withLabel: Boolean,
  label: String,
  modelValue: null,
});
const emit = defineEmits(['update:modelValue']);

const file = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function handleChangeFile(e) {
  file.value = e.target.files[0];
}
</script>

<template>
  <base-input :with-label="withLabel" :label="label">
    <div
      class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <div class="text-center">
        <photo-icon class="mx-auto h-12 w-12 text-gray-300" />
        <div class="mt-4">
          <template v-if="file">
            <p class="text-sm leading-6 text-gray-600">{{ file.name }}</p>
            <label
              for="file-upload"
              class="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500"
            >
              <span>Change</span>
              <input
                type="file"
                id="file-upload"
                class="sr-only"
                v-on:change="handleChangeFile"
              />
            </label>
          </template>
          <template v-else>
            <div class="flex text-sm leading-6 text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  id="file-upload"
                  class="sr-only"
                  v-on:change="handleChangeFile"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>

            <p class="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </template>
        </div>
      </div>
    </div>
  </base-input>
</template>
