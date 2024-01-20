<script setup>
import { computed } from 'vue';

const props = defineProps({
  weight: {
    type: String,
    default: 'medium',
  },
  color: {
    type: String,
    default: 'sky',
  },
  to: [Object, String],
  preventClick: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Object,
    default: () => ({
      base: '',
    }),
  },
});
const emit = defineEmits(['click']);

const weight = computed(() => {
  return {
    medium: 'font-medium',
    bold: 'font-bold',
  }[props.weight];
});
const color = computed(() => {
  return {
    sky: 'text-sky-600 hover:text-sky-500',
    custom: '',
  }[props.color];
});

function handleClick() {
  emit('click');
}
</script>

<template>
  <router-link v-if="to" :to="to" :class="[color, weight, classes.base]"
    ><slot
  /></router-link>
  <a
    v-else
    href=""
    :class="[color, weight, classes.base]"
    v-on:click.prevent="preventClick ? handleClick() : null"
    ><slot
  /></a>
</template>
