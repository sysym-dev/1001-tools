<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { ref } from 'vue';

const value = ref();
const qrcanvas = ref();

function onDownload() {
  const url = qrcanvas.value.$el.toDataURL();
  const a = document.createElement('a');

  a.setAttribute('href', url);
  a.setAttribute('download', `${value.value}.png`);

  a.click();
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-8">
    <div class="space-y-2">
      <p class="font-semibold">QR Content</p>
      <base-input
        textarea
        class="min-h-[300px]"
        placeholder="QR Content"
        v-model="value"
      />
    </div>
    <div class="space-y-2">
      <p class="font-semibold">QR Result</p>
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
        <base-button v-if="value" color="sky" @click="onDownload"
          >Download</base-button
        >
      </base-input>
    </div>
  </div>
</template>
