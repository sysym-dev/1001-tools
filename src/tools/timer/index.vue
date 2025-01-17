<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { computed, reactive, ref } from 'vue';
import {
  PlayerPlay as PlayIcon,
  PlayerPause as PauseIcon,
  RotateClockwise as ResetIcon,
} from '@vicons/tabler';

const timer = reactive({
  hour: 0,
  minute: 10,
  second: 10,
});
const diff = ref(null);
const timerInterval = ref();

const started = computed(() => diff.value > 0);
const running = computed(() => timerInterval.value);
const timerLabel = computed(() => {
  const labels = {
    hour: 'Jam',
    minute: 'Menit',
    second: 'Detik',
  };

  return Object.entries(timer)
    .filter(([key, value]) => value > 0)
    .map(([key, value]) => `${value} ${labels[key]}`)
    .join(' ');
});
const timerDisplay = computed(() => {
  if (diff.value === null) {
    return {
      hour: pad(timer.hour),
      minute: pad(timer.minute),
      second: pad(timer.second),
    };
  }

  if (diff.value < 1) {
    return {
      hour: pad(0),
      minute: pad(0),
      second: pad(0),
    };
  }

  return {
    hour: pad(
      Math.floor((diff.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    ),
    minute: pad(Math.floor((diff.value % (1000 * 60 * 60)) / (1000 * 60))),
    second: pad(Math.floor((diff.value % (1000 * 60)) / 1000)),
  };
});

function pad(num) {
  return `${num}`.padStart(2, '0');
}
function startTimer() {
  timerInterval.value = setInterval(() => {
    diff.value -= 100;

    if (diff.value < 1) {
      clearInterval(timerInterval.value);
    }
  }, 100);
}
function onStart() {
  const totalSecond = timer.hour * 3600 + timer.minute * 60 + timer.second;
  const finishAt = totalSecond * 1000 - 1;

  diff.value = finishAt;

  startTimer();
}
function onPause() {
  clearInterval(timerInterval.value);

  timerInterval.value = null;
}
function onResume() {
  startTimer();
}
function onRestart() {
  diff.value = null;
}
</script>

<template>
  <base-input box class="flex flex-col items-center justify-center gap-4">
    <p>{{ timerLabel }}</p>
    <div class="flex justify-center items-center font-bold text-5xl">
      <p>{{ timerDisplay.hour }}</p>
      <p>:</p>
      <p>{{ timerDisplay.minute }}</p>
      <p>:</p>
      <p>{{ timerDisplay.second }}</p>
    </div>
    <div class="flex gap-2">
      <base-button v-if="!started" color="sky" @click="onStart">
        <play-icon class="w-4 h-4" />
        <p>Start</p>
      </base-button>
      <template v-else>
        <base-button v-if="running" color="sky" @click="onPause">
          <pause-icon class="w-4 h-4" />
          <p>Pause</p>
        </base-button>
        <template v-else>
          <base-button color="sky" @click="onResume">
            <play-icon class="w-4 h-4" />
            <p>Resume</p>
          </base-button>
          <base-button @click="onRestart">
            <reset-icon class="w-4 h-4" />
            <p>Restart</p>
          </base-button>
        </template>
      </template>
    </div>
  </base-input>
</template>
