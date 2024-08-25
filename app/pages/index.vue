<template>
  <div class="h-screen flex flex-col md:flex-row">
    <div class="flex gap-x-4 fixed top-4 right-4 z-10">
      <ColorMode />
      <UButton
        icon="i-heroicons-cog-6-tooth"
        color="gray"
        variant="ghost"
        class="md:hidden"
        @click="isDrawerOpen = true"
      />
    </div>

    <USlideover
      v-model="isDrawerOpen"
      class="md:hidden"
      :ui="{ width: 'max-w-xs' }"
    >
      <LlmSettings
        v-model:llmParams="llmParams"
        @toggle-drawer="isDrawerOpen = false"
        @reset="resetSettings"
      />
    </USlideover>

    <div class="hidden md:block md:w-1/3 lg:w-1/4">
      <LlmSettings v-model:llmParams="llmParams" @reset="resetSettings" />
    </div>

    <UDivider orientation="vertical" class="hidden md:block" />

    <div class="flex-grow md:w-2/3 lg:w-3/4">
      <ChatPanel
        :chat-history="chatHistory"
        :loading="loading"
        @message="sendMessage"
        @clear="chatHistory = []"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, LlmParams, LoadingType } from '~~/types';

const isDrawerOpen = ref(false);

const defaultSettings: LlmParams = {
  model: '@cf/meta/llama-3.1-8b-instruct',
  temperature: 0.6,
  maxTokens: 512,
  systemPrompt: 'You are a helpful assistant.',
  stream: true,
};

const llmParams = reactive<LlmParams>({ ...defaultSettings });
const resetSettings = () => {
  Object.assign(llmParams, defaultSettings);
};

const { getResponse, streamResponse } = useChat();
const chatHistory = ref<ChatMessage[]>([]);
const loading = ref<LoadingType>('idle');
async function sendMessage(message: string) {
  chatHistory.value.push({ role: 'user', content: message });

  try {
    if (llmParams.stream) {
      loading.value = 'stream';
      const messageGenerator = streamResponse(
        '/api/chat',
        chatHistory.value,
        llmParams
      );

      let responseAdded = false;
      for await (const chunk of messageGenerator) {
        if (responseAdded) {
          // add the response to the current message
          chatHistory.value[chatHistory.value.length - 1]!.content += chunk;
        } else {
          // add a new message to the chat history
          chatHistory.value.push({
            role: 'assistant',
            content: chunk,
          });

          responseAdded = true;
        }
      }
    } else {
      loading.value = 'message';
      const response = await getResponse(
        '/api/chat',
        chatHistory.value,
        llmParams
      );

      chatHistory.value.push({ role: 'assistant', content: response });
    }
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    loading.value = 'idle';
  }
}
</script>
