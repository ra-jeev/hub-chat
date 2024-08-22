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
      />
    </USlideover>

    <div class="hidden md:block md:w-1/3 lg:w-1/4">
      <LlmSettings v-model:llmParams="llmParams" />
    </div>

    <UDivider orientation="vertical" class="hidden md:block" />

    <div class="flex-grow md:w-2/3 lg:w-3/4">
      <ChatPanel
        :chat-history="chatHistory"
        :is-streaming="streaming"
        @message="sendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, LlmParams } from '~~/types';

const isDrawerOpen = ref(false);
const chatHistory = ref<ChatMessage[]>([]);
const streaming = ref(false);

const llmParams = reactive<LlmParams>({
  model: '@cf/meta/llama-3.1-8b-instruct',
  temperature: 0.6,
  maxTokens: 512,
  topP: 1,
  topK: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  systemPrompt: 'You are a helpful assistant.',
});

async function sendMessage(message: string) {
  chatHistory.value.push({ role: 'user', content: message });

  try {
    streaming.value = true;
    const response = await $fetch<ReadableStream>('/api/chat', {
      method: 'POST',
      body: {
        messages: chatHistory.value,
        params: llmParams,
      },
      responseType: 'stream',
    });

    const reader = response.pipeThrough(new TextDecoderStream()).getReader();

    let responseAdded = false;

    // Read the chunk of data as we get it
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const lines = value.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice('data: '.length);
          if (data === '[DONE]') {
            break;
          } else {
            const jsonData = JSON.parse(data);
            if (jsonData.response) {
              if (responseAdded) {
                // add the response to the current message
                chatHistory.value[chatHistory.value.length - 1]!.content +=
                  jsonData.response;
              } else {
                // add a new message to the chat history
                chatHistory.value.push({
                  role: 'assistant',
                  content: jsonData.response,
                });

                responseAdded = true;
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    streaming.value = false;
  }
}
</script>
