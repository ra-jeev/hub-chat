<template>
  <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
    <ChatHeader
      :clear-disabled="chatHistory.length === 0"
      @clear="$emit('clear')"
      @show-drawer="$emit('showDrawer')"
    />
    <USeparator />
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-5">
      <template v-for="message in chatHistory" :key="message.id">
        <UserMessage
          v-if="message.role === 'user'"
          :content="message.content"
        />

        <AssistantMessage
          v-else
          :content="message.content"
          :message-id="message.id"
        />
      </template>
      <ChatLoadingSkeleton v-if="loading === 'message'" class="p-4" />
      <NoChats v-if="chatHistory.length === 0" class="h-full" />
    </div>

    <div
      class="flex items-start mx-4 mb-4 rounded-lg relative bg-gray-100 dark:bg-gray-800"
    >
      <UTextarea
        ref="userInput"
        v-model="userMessage"
        autoresize
        class="w-full"
        placeholder="How can I help you today?"
        size="xl"
        variant="none"
        :disabled="loading !== 'idle'"
        :maxrows="5"
        :rows="1"
        :ui="{ base: 'ps-4 py-4 pe-16' }"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.shift.exact.prevent="userMessage += '\n'"
      />

      <UButton
        icon="i-lucide-arrow-up"
        class="absolute top-3 right-4"
        :disabled="loading !== 'idle'"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, LoadingType } from '~~/types';

const props = defineProps<{
  chatHistory: ChatMessage[];
  loading: LoadingType;
}>();

const emit = defineEmits<{
  message: [message: string];
  clear: [];
  showDrawer: [];
}>();

const userMessage = ref('');
const chatContainer = useTemplateRef('chatContainer');
let observer: MutationObserver | null = null;

onMounted(() => {
  if (chatContainer.value) {
    observer = new MutationObserver(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });

    observer.observe(chatContainer.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const userInput = useTemplateRef('userInput');
watch(
  () => props.loading,
  () => {
    if (props.loading === 'idle') {
      nextTick(() => {
        userInput.value?.textareaRef?.focus();
      });
    }
  },
);

const sendMessage = () => {
  if (!userMessage.value.trim()) return;

  emit('message', userMessage.value);

  userMessage.value = '';
};
</script>
