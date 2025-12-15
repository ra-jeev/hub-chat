<template>
  <div
    class="flex items-start gap-x-4 p-4 rounded-lg bg-gray-50/60 dark:bg-gray-800/60"
  >
    <div class="w-12 h-12 p-3 rounded-full bg-blue-500/20">
      <UIcon
        name="i-lucide-sparkles"
        class="w-6 h-6 text-blue-400 dark:text-blue-500"
      />
    </div>

    <MDCRenderer
      v-if="ast"
      class="flex-1 prose dark:prose-invert"
      :body="ast.body"
    />
  </div>
</template>

<script setup lang="ts">
import { parseMarkdown } from '#imports';

const props = defineProps<{
  content: string;
  messageId: string;
}>();

const { data: ast, refresh } = await useAsyncData(props.messageId, () =>
  parseMarkdown(props.content),
);

watch(
  () => props.content,
  () => {
    refresh();
  },
);
</script>
