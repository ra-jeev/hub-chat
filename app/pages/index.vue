<template>
  <div class="h-dvh flex flex-col md:flex-row">
    <USlideover
      v-model:open="isDrawerOpen"
      class="max-w-xs"
      title="LLM Settings"
      description="Change LLM model and its settings"
    >
      <template #content>
        <LlmSettings
          v-model:llm-params="llmParams"
          @hide-drawer="isDrawerOpen = false"
          @reset="resetSettings"
        />
      </template>
    </USlideover>

    <div class="hidden md:block md:w-1/3 lg:w-1/4 max-w-sm">
      <LlmSettings v-model:llm-params="llmParams" @reset="resetSettings" />
    </div>

    <USeparator orientation="vertical" class="hidden md:block" />

    <ChatPanel
      class="grow"
      :chat-history="chatHistory"
      :loading="loading"
      @clear="chatHistory = []"
      @message="sendMessage"
      @show-drawer="isDrawerOpen = true"
    />
  </div>
</template>

<script setup lang="ts">
import { useStorageAsync } from '@vueuse/core';
import type { ChatMessage, LlmParams, LoadingType } from '~~/types';

const isDrawerOpen = ref(false);

const defaultSettings: LlmParams = {
  model: '@cf/meta/llama-3.2-3b-instruct',
  temperature: 0.6,
  maxTokens: 512,
  systemPrompt: 'You are a helpful assistant.',
  stream: true,
};

const llmParams = useStorageAsync<LlmParams>('llmParams', {
  ...defaultSettings,
});
const resetSettings = () => {
  llmParams.value = { ...defaultSettings };
};

const chatHistory = ref<ChatMessage[]>([]);
const loading = ref<LoadingType>('idle');
async function sendMessage(message: string) {
  chatHistory.value.push({
    role: 'user',
    content: message,
    id: String(Date.now()),
  });

  try {
    loading.value = llmParams.value.stream ? 'stream' : 'message';

    const response = useAIChat('/api/chat', llmParams.value.model, {
      ...llmParams.value,
      model: undefined,
      messages: chatHistory.value,
    })();

    let responseAdded = false;
    for await (const chunk of response) {
      if (responseAdded) {
        // add the chunk to the current message's content
        chatHistory.value[chatHistory.value.length - 1]!.content += chunk;
      } else {
        // add a new message to the chat history
        chatHistory.value.push({
          role: 'assistant',
          content: chunk,
          id: String(Date.now()),
        });

        responseAdded = true;
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    loading.value = 'idle';
  }
}
</script>
