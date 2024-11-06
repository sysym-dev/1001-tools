<script setup>
import BaseInput from 'src/components/base/base-input.vue';
</script>

<template>
  <div class="grid md:grid-cols-2 gap-8">
    <div class="space-y-2">
      <p class="font-semibold">QR Content</p>
      <textarea
        class="rounded-lg px-3 py-2 pb-3 border border-gray-300 w-full min-h-[200px] focus:ring-sky-600 focus:border-sky-600"
        placeholder="QR Content"
      ></textarea>
    </div>
    <div class="space-y-2">
      <p class="font-semibold">QR Result</p>
      <base-input box></base-input>
    </div>
  </div>
</template>
