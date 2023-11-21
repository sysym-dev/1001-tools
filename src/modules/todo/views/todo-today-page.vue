<script setup lang="ts">
import { NCard, NSpace, NCollapse, NCollapseItem, NPageHeader } from 'naive-ui';
import { ref } from 'vue';
import TodoListTable from 'src/modules/todo/components/todo-list-table.vue';
import { parseDate } from 'src/utils/date';
import { ResourceCollection } from 'src/common/resource/collection';
import { Todo } from '../todo.entity';

const numberDone = ref<number>(0);

function handleDoneLoaded(resource: ResourceCollection<Todo>) {
  numberDone.value = resource.meta.total;
}
</script>

<template>
  <n-space vertical :size="[0, 16]">
    <n-card>
      <todo-list-table
        title="Today"
        :subtitle="parseDate(new Date()).format('LL')"
        with-quick-create
        with-header
        with-status-quick-action
        :filter="{
          due_at_from: parseDate(new Date()).startOf('d').toISOString(),
          due_at_to: parseDate(new Date()).endOf('d').toISOString(),
          is_done: false,
        }"
        sort="created_at"
        :page="{
          size: 100,
        }"
      />
    </n-card>

    <n-card>
      <n-collapse display-directive="show" :default-expanded-names="['done']">
        <n-collapse-item title="Today Done" name="done">
          <template #header>
            <n-page-header :title="`Today Done (${numberDone})`" />
          </template>
          <todo-list-table
            :with-quick-create="false"
            :with-header="false"
            with-status-quick-action
            :with-columns="{
              done_at: true,
            }"
            :filter="{
              due_at_from: parseDate(new Date()).startOf('d').toISOString(),
              due_at_to: parseDate(new Date()).endOf('d').toISOString(),
              is_done: true,
            }"
            sort="created_at"
            :page="{
              size: 100,
            }"
            v-on:load="handleDoneLoaded"
          />
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </n-space>
</template>
