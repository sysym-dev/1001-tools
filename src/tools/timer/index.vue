<script setup>
import BaseInput from 'src/components/base/base-input.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { computed, nextTick, reactive, ref } from 'vue';
import {
  PlayerPlay as PlayIcon,
  PlayerPause as PauseIcon,
  RotateClockwise as ResetIcon,
} from '@vicons/tabler';
import IMask from 'imask';

const timer = reactive({
  hour: 0,
  minute: 0,
  second: 10,
});
const diff = ref(null);
const timerInterval = ref();
const editingTimer = ref(false);
const editingTimerInput = ref();
const editingTimerValue = ref('');
const editingTimerMask = ref();

const started = computed(() => diff.value > 0);
const onceStarted = computed(() => diff.value !== null);
const running = computed(() => timerInterval.value);
const timerPlaceholder = computed(
  () => `${pad(timer.hour)}:${pad(timer.minute)}:${pad(timer.second)}`,
);
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
  if (!editingTimer.value) {
    const totalSecond = timer.hour * 3600 + timer.minute * 60 + timer.second;
    const finishAt = totalSecond * 1000 + 1000 - 1;

    diff.value = finishAt;

    startTimer();
  }
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
async function onEditTimer() {
  if (!started.value) {
    editingTimer.value = true;
    editingTimerValue.value = null;

    await nextTick();

    editingTimerMask.value = IMask(editingTimerInput.value, {
      mask: 'hh:mm:ss',
      blocks: {
        hh: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 99,
          maxLength: 2,
        },
        mm: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
        ss: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
      },
      lazy: false,
      placeholderChar: '0',
    });

    editingTimerInput.value.focus();
  }
}
async function onChangeTimer() {
  editingTimer.value = false;

  const value = editingTimerMask.value.value;

  if (value !== '00:00:00') {
    const [h, m, s] = value.split(':');

    timer.hour = parseInt(h);
    timer.minute = parseInt(m);
    timer.second = parseInt(s);
  }
}
</script>

<template>
  <base-input box class="flex flex-col items-center justify-center gap-4">
    <p>{{ timerLabel }}</p>
    <div class="relative">
      <div
        :class="[
          'flex justify-center items-center font-bold text-5xl',
          started ? '' : 'cursor-pointer',
          editingTimer ? 'opacity-0' : '',
        ]"
        v-tooltip="{ content: 'Click To Edit', disabled: started }"
        @click="onEditTimer"
      >
        <p>{{ timerDisplay.hour }}</p>
        <p>:</p>
        <p>{{ timerDisplay.minute }}</p>
        <p>:</p>
        <p>{{ timerDisplay.second }}</p>
      </div>
      <input
        v-if="editingTimer"
        ref="editingTimerInput"
        class="absolute -top-[7px] left-0 bg-transparent leading-none m-0 border-0 p-0 text-5xl font-bold w-full placeholder-gray-300 focus:ring-0"
        :placeholder="timerPlaceholder"
        @blur="onChangeTimer"
        v-model="editingTimerValue"
      />
    </div>
    <div class="flex gap-2">
      <base-button v-if="!started" color="sky" @click="onStart">
        <play-icon class="w-4 h-4" />
        <p>{{ onceStarted ? 'Start Again' : 'Start' }}</p>
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
