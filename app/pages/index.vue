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
        :llm-params="llmParams"
        @message="sendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isDrawerOpen = ref(false);
const chatHistory = ref<{ role: string; content: string }[]>([]);
const llmParams = reactive({
  model: '@cf/meta/llama-3.1-8b-instruct',
  temperature: 0.6,
  maxTokens: 256,
  topP: 0,
  topK: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  repetitionPenalty: 0,
  systemPrompt: 'You are a helpful assistant.',
});

async function sendMessage(message: string) {
  chatHistory.value.push({ role: 'user', content: message });

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message,
        params: llmParams,
      },
    });

    chatHistory.value.push({ role: 'assistant', content: response.message });
  } catch (error) {
    console.error('Error sending message:', error);
    // Handle error (e.g., show an error message to the user)
  }
}
</script>
