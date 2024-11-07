<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <div class="grid md:grid-cols-2 gap-8">
    <div class="space-y-2">
      <p class="font-semibold">QR Content</p>
      <base-input
        textarea
        class="min-h-[250px]"
        placeholder="QR Content"
        v-model="value"
      />
    </div>
    <div class="space-y-2">
      <p class="font-semibold">QR Result</p>
      <base-input box class="flex items-center justify-center min-h-[250px]">
        <div :class="{ 'opacity-25': !value }">
          <vue-qrcode
            :value="value || 'example'"
            :options="{ margin: 0, width: 150 }"
          />
        </div>
      </base-input>
    </div>
  </div>
</template>
