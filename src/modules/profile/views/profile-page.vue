<script setup lang="ts">
import { NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui';
</script>

<template>
  <n-card title="Profile">
    <n-form
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-form-item label="Name" path="name">
        <n-input placeholder="Name" />
      </n-form-item>
      <n-form-item label="Email" path="email">
        <n-input placeholder="Email" />
      </n-form-item>
      <n-button type="primary">Save</n-button>
    </n-form>
  </n-card>
</template>
