<script setup>
import { stringify } from 'smol-toml';
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
const jsonValid = ref(false);
const toml = ref(null);
const copied = ref(false);

function onChangeJson(e) {
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
async function onDownloadToml() {
  const file = new File([toml.value], 'result.toml', {
    type: 'application/toml',
  });
  const url = URL.createObjectURL(file);

  const a = document.createElement('a');

  a.setAttribute('href', url);
  a.setAttribute('download', file.name);

  a.click();

  URL.revokeObjectURL(url);
}

watch(json, onChangeJson);
</script>

<template>
  <div class="grid md:grid-cols-2 items-start gap-8">
    <div class="space-y-2">
      <div>
        <div class="flex items-center justify-between">
          <p class="font-medium">Insert JSON Here</p>
          <component
            v-if="json"
            :is="jsonValid ? SuccessIcon : WarningIcon"
            :class="[jsonValid ? 'text-green-600' : 'text-red-600', 'w-4 h-4']"
            v-tooltip="jsonValid ? 'JSON valid' : 'JSON tidak valid'"
          />
        </div>
      </div>
      <div class="border">
        <code-mirror
          placeholder="Insert JSON Here"
          :extensions="jsonExtensions"
          :style="{ height: '800px' }"
          v-model="json"
        />
      </div>
    </div>
    <div class="space-y-2">
      <div>
        <div class="flex items-center justify-between">
          <p class="font-medium">TOML Result</p>
          <div class="flex items-center gap-x-2">
            <button
              v-if="toml"
              v-tooltip="{
                content: 'Copied!',
                triggers: [],
                shown: copied,
                delay: { show: 0, hide: 0 },
              }"
              @click="onCopyToml"
            >
              <copy-icon class="w-4 h-4 text-gray-600" />
            </button>
            <button v-if="toml" @click="onDownloadToml">
              <download-icon class="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div class="border">
        <code-mirror
          placeholder="TOML Result"
          :extensions="tomlExtensions"
          :style="{ height: '800px' }"
          disabled
          v-model="toml"
        />
      </div>
    </div>
  </div>
</template>
