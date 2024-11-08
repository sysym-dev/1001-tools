<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { ref } from 'vue';

const value = ref();
const qrcanvas = ref();
const copied = ref(false);

function onDownload() {
  const url = qrcanvas.value.$el.toDataURL();
  const a = document.createElement('a');

  a.setAttribute('href', url);
  a.setAttribute('download', `${value.value}.png`);

  a.click();
}
function onCopy() {
  qrcanvas.value.$el.toBlob(async (blob) => {
    const item = new ClipboardItem({
      [blob.type]: blob,
    });

    await navigator.clipboard.write([item]);

    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 1000);
  });
}
function onClear() {
  value.value = null;
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-8">
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <p class="font-semibold">QR Content</p>
        <button
          v-if="value"
          class="text-red-600 font-semibold"
          @click="onClear"
        >
          Clear
        </button>
      </div>
      <base-input
        textarea
        class="min-h-[300px]"
        placeholder="QR Content"
        v-model="value"
      />
    </div>
    <div class="space-y-2">
      <p class="font-semibold">QR Generated</p>
      <base-input
        box
        class="flex flex-col items-center justify-center min-h-[300px] gap-y-6"
      >
        <div :class="{ 'opacity-25': !value }">
          <vue-qrcode
            ref="qrcanvas"
            :value="value || 'example'"
            :options="{ margin: 0, width: 150, tag: 'canvas' }"
          />
        </div>
        <div v-if="value" class="flex gap-2">
          <base-button
            color="sky"
            v-tooltip="{
              content: 'Copied!',
              triggers: [],
              shown: copied,
              delay: { show: 0, hide: 0 },
            }"
            @click="onCopy"
            >Copy</base-button
          >
          <base-button color="sky" @click="onDownload">Download</base-button>
        </div>
      </base-input>
    </div>
  </div>
</template>
