<template>
  <div class="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
    <ChatHeader
      :clear-disabled="chatHistory.length === 0"
      @clear="$emit('clear')"
      @show-drawer="$emit('showDrawer')"
    />
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
      <ChatLoadingSkeleton v-if="loading === 'message'" />
      <NoChats v-if="chatHistory.length === 0" class="h-full" />
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
  showDrawer: [];
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
