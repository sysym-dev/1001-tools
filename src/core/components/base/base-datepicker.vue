<script setup>
import BaseInput from './base-input.vue';
import BaseDropdown from './base-dropdown.vue';
import BaseButton from './base-button.vue';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import { date } from 'src/core/utils/date';

const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: null,
  state: String,
  message: String,
});
const emit = defineEmits(['update:modelValue']);

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const input = ref(null);
const calendar = ref(date());
const selected = computed({
  get() {
    return props.modelValue ? date(props.modelValue) : null;
  },
  set(value) {
    emit('update:modelValue', value ? value.toDate() : null);
  },
});

const selectedDisplay = computed(() =>
  selected.value ? selected.value.format('DD/MM/YYYY') : null,
);
const title = computed(() => calendar.value.format('MMMM YYYY'));
const dates = computed(() => {
  const monthDates = calendar.value.daysInMonth();
  const monthStartDateOffset = calendar.value.startOf('month').day();
  const monthEndDateOffset = calendar.value.endOf('month').day();

  const prependDates = Array.from({ length: monthStartDateOffset }, (_, i) =>
    calendar.value.startOf('month').subtract(i + 1, 'd'),
  ).reverse();
  const appendDates = Array.from({ length: 6 - monthEndDateOffset }, (_, i) =>
    calendar.value.endOf('month').add(i + 1, 'd'),
  );

  return [
    ...prependDates,
    ...Array.from({ length: monthDates }, (_, i) =>
      date(calendar.value).date(i + 1),
    ),
    ...appendDates,
  ];
});

function handlePrev() {
  calendar.value = calendar.value.subtract(1, 'month');
}
function handleNext() {
  calendar.value = calendar.value.add(1, 'month');
}
function handleClickDate(date) {
  selected.value = date;

  setTimeout(() => {
    if (!selected.value.isSame(calendar.value, 'M')) {
      calendar.value = selected.value;
    }
  });

  input.value.inputEl.focus();
}
function handleOpen() {
  calendar.value = selected.value ?? date();
}
function handleClear() {
  selected.value = null;
  input.value.inputEl.focus();
}
</script>

<template>
  <base-input with-label :label="label" :message="message">
    <base-dropdown width="full" v-on:open="handleOpen">
      <template #toggle="{ open }">
        <base-input
          ref="input"
          :with-label="false"
          :state="state"
          :placeholder="placeholder"
          readonly
          v-on:focus="open"
          v-model="selectedDisplay"
        >
          <template #append>
            <button v-if="selected" type="button" v-on:click="handleClear">
              <x-mark-icon class="w-4 h-4"></x-mark-icon>
            </button>
          </template>
        </base-input>
      </template>

      <template #content="{ visible }">
        <div
          v-if="visible"
          class="absolute origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mt-2 z-10 bg-white p-2 max-w-[280px]"
        >
          <div class="flex items-center justify-between">
            <base-button
              size="xs"
              color="transparent-white"
              v-on:click="handlePrev"
            >
              <chevron-left-icon class="w-4 h-4" />
            </base-button>
            <p class="font-semibold text-sm text-gray-900">{{ title }}</p>
            <base-button
              size="xs"
              color="transparent-white"
              v-on:click="handleNext"
            >
              <chevron-right-icon class="w-4 h-4" />
            </base-button>
          </div>
          <div class="grid grid-cols-7 gap-1 mt-1">
            <p
              class="text-center text-gray-400 text-sm"
              :key="day"
              v-for="day in days"
            >
              {{ day }}
            </p>
            <base-button
              v-for="i in dates"
              :key="i"
              size="sm"
              :class="[
                calendar.isSame(i, 'M') &&
                  (!selected || !selected.isSame(i)) &&
                  'text-gray-700 hover:text-gray-700',
              ]"
              :color="
                selected && selected.isSame(i) ? 'sky' : 'transparent-white'
              "
              v-on:click="handleClickDate(i)"
              >{{ i.date() }}</base-button
            >
          </div>
        </div>
      </template>
    </base-dropdown>
  </base-input>
</template>
