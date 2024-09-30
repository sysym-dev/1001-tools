<script setup>
import BaseCard from 'src/components/base-card.vue';
import { stringify } from 'smol-toml';
import { ref } from 'vue';
import {
  Copy as CopyIcon,
  Check as SuccessIcon,
  AlertTriangle as WarningIcon,
} from '@vicons/tabler';

const json = ref(null);
const jsonValid = ref(false);
const toml = ref(null);
const copied = ref(false);

function onChangeJson(e) {
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 'px';

  if (json.value === '') {
    toml.value = '';

    return;
  }

  try {
    toml.value = stringify(JSON.parse(json.value));

    jsonValid.value = true;
  } catch (err) {
    jsonValid.value = false;
  }
}
async function onCopyToml() {
  await navigator.clipboard.writeText(toml.value);

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1000);
}
</script>

<template>
  <base-card :with-padding="false">
    <div class="grid grid-cols-2 divide-x">
      <div class="flex flex-col justify-start">
        <div>
          <div class="px-4 h-12 border-b flex items-center justify-between">
            <p class="font-medium">Insert JSON Here</p>
            <component
              v-if="json"
              :is="jsonValid ? SuccessIcon : WarningIcon"
              :class="[
                jsonValid ? 'text-green-600' : 'text-red-600',
                'w-4 h-4',
              ]"
              v-tooltip="jsonValid ? 'JSON valid' : 'JSON tidak valid'"
            />
          </div>
        </div>
        <textarea
          rows="5"
          placeholder="Insert JSON Here"
          class="px-4 py-3 resize-none overflow-hidden w-full h-full focus:outline-none rounded-b-xl"
          v-model="json"
          @input="onChangeJson"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <div>
          <div class="px-4 h-12 border-b flex items-center justify-between">
            <p class="font-medium">TOML Result</p>
            <button
              v-if="toml"
              class="border flex items-center py-0.5 px-2 rounded-md gap-x-1"
              v-tooltip="{
                content: 'Copied!',
                triggers: [],
                shown: copied,
                delay: { show: 0, hide: 0 },
              }"
              @click="onCopyToml"
            >
              <copy-icon class="w-3.5 h-3.5" />
              <span class="text-sm">Copy</span>
            </button>
          </div>
        </div>
        <textarea
          rows="5"
          placeholder="TOML Result"
          class="px-4 py-3 resize-none overflow-hidden w-full h-full focus:outline-none rounded-b-xl"
          readonly
          v-model="toml"
        ></textarea>
      </div>
    </div>
  </base-card>
</template>
