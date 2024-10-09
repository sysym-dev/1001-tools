<script setup>
import { parse } from 'smol-toml';
import { ref, watch } from 'vue';
import {
  Copy as CopyIcon,
  Check as SuccessIcon,
  AlertTriangle as WarningIcon,
  Download as DownloadIcon,
} from '@vicons/tabler';
import { Codemirror as CodeMirror } from 'vue-codemirror';
import { json as LangJson } from '@codemirror/lang-json';

const jsonExtensions = [LangJson()];
const tomlExtensions = [];

const json = ref(null);
const tomlValid = ref(false);
const toml = ref(null);
const copied = ref(false);

function onChangeToml(e) {
  if (toml.value === '') {
    json.value = '';

    return;
  }

  try {
    json.value = JSON.stringify(parse(toml.value), null, 2);

    tomlValid.value = true;
  } catch (err) {
    tomlValid.value = false;
  }
}
async function onCopyJson() {
  await navigator.clipboard.writeText(json.value);

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1000);
}
async function onDownloadJson() {
  const file = new File([json.value], 'result.json', {
    type: 'application/json',
  });
  const url = URL.createObjectURL(file);

  const a = document.createElement('a');

  a.setAttribute('href', url);
  a.setAttribute('download', file.name);

  a.click();

  URL.revokeObjectURL(url);
}

watch(toml, onChangeToml);
</script>

<template>
  <div class="grid md:grid-cols-2 items-start gap-8">
    <div class="space-y-2">
      <div>
        <div class="flex items-center justify-between">
          <p class="font-medium">Insert TOML Here</p>
          <component
            v-if="toml"
            :is="tomlValid ? SuccessIcon : WarningIcon"
            :class="[tomlValid ? 'text-green-600' : 'text-red-600', 'w-4 h-4']"
            v-tooltip="tomlValid ? 'JSON valid' : 'JSON tidak valid'"
          />
        </div>
      </div>
      <div class="border">
        <code-mirror
          placeholder="Insert TOML Here"
          :extensions="tomlExtensions"
          :style="{ height: '800px' }"
          v-model="toml"
        />
      </div>
    </div>
    <div class="space-y-2">
      <div>
        <div class="flex items-center justify-between">
          <p class="font-medium">JSON Result</p>
          <div class="flex items-center gap-x-2">
            <button
              v-if="json"
              v-tooltip="{
                content: 'Copied!',
                triggers: [],
                shown: copied,
                delay: { show: 0, hide: 0 },
              }"
              @click="onCopyJson"
            >
              <copy-icon class="w-4 h-4 text-gray-600" />
            </button>
            <button v-if="json" @click="onDownloadJson">
              <download-icon class="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div class="border">
        <code-mirror
          placeholder="JSON Result"
          :extensions="jsonExtensions"
          :style="{ height: '800px' }"
          disabled
          v-model="json"
        />
      </div>
    </div>
  </div>
</template>
