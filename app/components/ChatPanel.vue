<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center p-4 gap-x-4">
      <h2 class="text-lg md:text-xl font-bold">Chat</h2>
      <UTooltip text="Clear chat">
        <UButton
          color="gray"
          icon="i-heroicons-trash"
          size="xs"
          @click="$emit('clear')"
        />
      </UTooltip>
    </div>
    <UDivider />
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-5">
      <div
        v-for="(message, index) in chatHistory"
        :key="`message-${index}`"
        class="flex items-start gap-x-4"
      >
        <div
          class="w-12 h-12 p-2 rounded-full"
          :class="`${
            message.role === 'user' ? 'bg-primary/20' : 'bg-blue-500/20'
          }`"
        >
          <UIcon
            :name="`${
              message.role === 'user'
                ? 'i-mdi-user'
                : 'i-heroicons-sparkles-solid'
            }`"
            class="w-8 h-8"
            :class="`${
              message.role === 'user' ? 'text-primary-400' : 'text-blue-400'
            }`"
          />
        </div>
        <div v-if="message.role === 'user'">
          {{ message.content }}
        </div>
        <AssistantMessage v-else :content="message.content" />
      </div>
      <div v-if="loading === 'message'" class="flex items-center space-x-4">
        <div class="w-12 h-12 p-2 rounded-full bg-blue-500/20">
          <UIcon
            name="i-heroicons-sparkles-solid"
            class="w-8 h-8 text-blue-400"
          />
        </div>
        <div class="space-y-4">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
      <div
        v-if="chatHistory.length === 0"
        class="flex flex-col gap-y-6 items-center justify-center h-full"
      >
        <NoChatsImg class="w-64 h-48" />
        <div class="text-center text-gray-500 dark:text-gray-400">
          Ask me anything, type to get started
        </div>
      </div>
    </div>
    <UDivider />
    <div class="flex items-start p-3.5 relative">
      <UTextarea
        v-model="userMessage"
        placeholder="How can I help you today?"
        class="w-full"
        :ui="{ padding: { xl: 'pr-11' } }"
        :rows="1"
        :maxrows="5"
        :disabled="loading !== 'idle'"
        autoresize
        size="xl"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.shift.exact.prevent="userMessage += '\n'"
      />

      <UButton
        icon="i-heroicons-arrow-up-20-solid"
        class="absolute top-5 right-5"
        :disabled="loading !== 'idle'"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, LoadingType } from '~~/types';

defineProps<{
  chatHistory: ChatMessage[];
  loading: LoadingType;
}>();

const emit = defineEmits<{
  message: [message: string];
  clear: [];
}>();

const userMessage = ref('');
const chatContainer = ref<HTMLElement | null>(null);
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

const sendMessage = () => {
  if (!userMessage.value.trim()) return;

  emit('message', userMessage.value);

  userMessage.value = '';
};
</script>
