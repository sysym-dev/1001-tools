<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import { Html5Qrcode } from 'html5-qrcode';
import { nextTick, onMounted, ref } from 'vue';

const scanner = ref();
const result = ref();
const upload = ref(false);
const uploadedImage = ref(null);
const uploadedQrPreview = ref();
const copied = ref(false);
const link = ref(false);
const errorUpload = ref(false);
const errorCamera = ref(false);

async function setupScanner() {
  scanner.value = new Html5Qrcode('qr-code-scanner');

  startScanCamera();
}
async function startScanCamera() {
  scanner.value.clear();
  result.value = null;

  try {
    await scanner.value.start(
      { facingMode: 'environment' },
      { qrbox: 200 },
      onScan,
      onErrorScan,
    );
  } catch (err) {
    errorCamera.value = err;
  }
}
function setResult(text) {
  result.value = text;

  try {
    new URL(result.value);

    link.value = true;
  } catch {
    link.value = false;
  }
}
async function uploadImage(file) {
  uploadedImage.value = file;
  errorUpload.value = null;

  try {
    const text = await scanner.value.scanFile(uploadedImage.value, true);

    setResult(text);

    await nextTick();

    const fr = new FileReader();

    fr.onload = () => {
      uploadedQrPreview.value.src = fr.result;
    };

    fr.readAsDataURL(uploadedImage.value);
  } catch (err) {
    uploadedImage.value = null;
    errorUpload.value = err;
  }
}

function onScan(text) {
  setResult(text);
}
function onErrorScan(err) {
  // console.log(err)
}
function onChangeToUpload() {
  if (scanner.value.getState() === 2) {
    scanner.value.stop();
  }

  result.value = null;
  upload.value = true;
}
function onChangeToScan() {
  uploadedImage.value = null;
  upload.value = false;

  startScanCamera();
}
async function onUploadImage(e) {
  if (e.target.files && e.target.files.length) {
    uploadImage(e.target.files[0]);
  }
}
async function onCopyResult() {
  await navigator.clipboard.writeText(result.value);

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1000);
}
function onClear() {
  result.value = null;
}
function onDropImage(e) {
  const files = e.dataTransfer.files;

  if (files.length) {
    uploadImage(files[0]);
  }
}

onMounted(() => {
  setupScanner();
});
</script>

<template>
  <div class="grid md:grid-cols-2 gap-8">
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <p class="font-semibold">
          {{ upload ? 'Upload QR Here' : 'Scan QR Here' }}
        </p>
        <button
          v-if="!upload"
          class="text-sky-600 font-semibold"
          @click="onChangeToUpload"
        >
          Upload QR Image
        </button>
        <button
          v-else
          class="text-sky-600 font-semibold"
          @click="onChangeToScan"
        >
          Scan QR
        </button>
      </div>
      <div v-show="upload">
        <div
          class="p-4 min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col space-y-4"
          @drop.prevent="onDropImage"
          @dragenter.prevent
          @dragover.prevent
          @dragleave.prevent
        >
          <base-alert v-if="errorUpload" @close="errorUpload = null">{{
            errorUpload
          }}</base-alert>
          <div class="text-center flex-grow flex flex-col justify-center gap-4">
            <img
              v-if="uploadedImage"
              class="w-fit mx-auto max-h-[200px]"
              ref="uploadedQrPreview"
            />
            <div class="space-y-2">
              <base-button
                tag="label"
                class="block w-fit mx-auto"
                for="upload-qr-image"
                >Browse QR Image</base-button
              >
              <input
                type="file"
                id="upload-qr-image"
                class="hidden"
                accept="image/*"
                @change="onUploadImage"
              />
              <p class="italic text-gray-400">Or Drop Image To Scan</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!upload">
        <base-alert v-if="errorCamera" :closable="false">{{
          errorCamera
        }}</base-alert>
        <div id="qr-code-scanner"></div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <p class="font-semibold">Scan Results</p>
        <button
          v-if="result"
          class="text-red-600 font-semibold"
          @click="onClear"
        >
          Clear
        </button>
      </div>
      <div
        class="rounded-lg px-3 py-2 pb-3 border border-gray-300 min-h-[200px] text-gray-900 flex flex-col justify-between"
      >
        <template v-if="result">
          <p class="break-all">{{ result }}</p>
          <div :class="['grid gap-2', link ? 'grid-cols-2' : 'grid-cols-1']">
            <base-button
              color="sky"
              v-tooltip="{
                content: 'Copied!',
                triggers: [],
                shown: copied,
                delay: { show: 0, hide: 0 },
              }"
              @click="onCopyResult"
              >Copy</base-button
            >
            <base-button
              v-if="link"
              tag="a"
              :href="result"
              target="_blank"
              color="sky"
              >Open Link</base-button
            >
          </div>
        </template>
        <p v-else class="text-gray-400">Scan Results Here</p>
      </div>
    </div>
  </div>
</template>
