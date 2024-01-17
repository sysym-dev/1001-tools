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
});
const emit = defineEmits(['click']);

const weight = computed(() => {
  return {
    medium: 'font-medium',
  }[props.weight];
});
const color = computed(() => {
  return {
    sky: 'text-sky-600 hover:text-sky-500',
  }[props.color];
});

function handleClick() {
  emit('click');
}
</script>

<template>
  <router-link v-if="to" :to="to" :class="[color, weight]"
    ><slot
  /></router-link>
  <a
    v-else
    href=""
    :class="[color, weight]"
    v-on:click.prevent="preventClick ? handleClick() : null"
    ><slot
  /></a>
</template>
