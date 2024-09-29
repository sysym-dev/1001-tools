<script setup>
import BaseCard from 'src/components/base-card.vue';
import { parse, stringify } from 'smol-toml';
import { ref } from 'vue';

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
      <div class="flex flex-col">
        <div class="px-4 py-3 border-b flex items-center justify-between">
          <p class="font-medium">Insert JSON Here</p>
          <p
            v-if="json"
            :class="[jsonValid ? 'text-green-600' : 'text-red-600']"
          >
            {{ jsonValid ? 'Valid' : 'Invalid' }}
          </p>
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
        <div class="px-4 py-3 border-b flex items-center justify-between">
          <p class="font-medium">TOML Result</p>
          <template v-if="toml">
            <p v-if="copied">Copied</p>
            <button v-else @click="onCopyToml">Copy</button>
          </template>
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
