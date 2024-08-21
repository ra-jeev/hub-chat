<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex items-center justify-between p-4">
      <h2 class="text-lg md:text-xl font-bold">LLM Settings</h2>
      <UButton
        icon="i-heroicons-x-mark-20-solid"
        color="gray"
        variant="ghost"
        class="md:hidden"
        @click="$emit('toggleDrawer')"
      />
    </div>
    <UDivider />
    <div class="p-4 flex-1 space-y-6 overflow-y-auto">
      <UFormGroup label="Model">
        <USelectMenu v-model="llmParams.model" size="md" :options="models" />
      </UFormGroup>

      <RangeInput
        v-model="llmParams.temperature"
        label="Temperature"
        :min="0"
        :max="5"
        :step="0.1"
      />

      <RangeInput
        v-model="llmParams.maxTokens"
        label="Max Tokens"
        :min="1"
        :max="4096"
      />

      <UFormGroup label="System Prompt">
        <UTextarea
          v-model="llmParams.systemPrompt"
          :rows="3"
          :maxrows="8"
          autoresize
        />
      </UFormGroup>

      <UAccordion
        :items="accordionItems"
        color="white"
        variant="solid"
        size="md"
      >
        <template #item>
          <UCard :ui="{ body: { base: 'space-y-6', padding: 'p-4 sm:p-4' } }">
            <RangeInput
              v-model="llmParams.topP"
              label="Top P"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <RangeInput
              v-model="llmParams.topK"
              label="Top K"
              :min="1"
              :max="50"
            />

            <RangeInput
              v-model="llmParams.frequencyPenalty"
              label="Frequency Penalty"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <RangeInput
              v-model="llmParams.presencePenalty"
              label="Presence Penalty"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <RangeInput
              v-model="llmParams.repetitionPenalty"
              label="Repetition Penalty"
              :min="0"
              :max="2"
              :step="0.1"
            />
          </UCard>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
type LlmParams = {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;
  presencePenalty: number;
  repetitionPenalty: number;
  systemPrompt: string;
};

const llmParams = defineModel('llmParams', {
  type: Object as () => LlmParams,
  required: true,
});

defineEmits(['toggleDrawer']);

const accordionItems = [
  {
    label: 'Advanced Settings',
    defaultOpen: false,
  },
];

const models = [
  'deepseek-coder-6.7b-base-awq',
  'deepseek-coder-6.7b-instruct-awq',
  'deepseek-math-7b-instruct',
  'discolm-german-7b-v1-awq',
  'falcon-7b-instruct',
  'gemma-7b-it',
  'hermes-2-pro-mistral-7b',
  'llama-2-13b-chat-awq',
  'llama-2-7b-chat-fp16',
  'llama-2-7b-chat-int8',
  'llama-3-8b-instruct',
  'llama-3-8b-instruct-awq',
  'llama-3.1-8b-instruct',
  'llama-3.1-8b-instruct-awq',
  'llama-3.1-8b-instruct-fp8',
  'llamaguard-7b-awq',
  'meta-llama-3-8b-instruct',
  'mistral-7b-instruct-v0.1',
  'mistral-7b-instruct-v0.1-awq',
  'mistral-7b-instruct-v0.2',
  'neural-chat-7b-v3-1-awq',
  'openchat-3.5-0106',
  'openhermes-2.5-mistral-7b-awq',
  'phi-2',
  'qwen1.5-0.5b-chat',
  'qwen1.5-1.8b-chat',
  'qwen1.5-14b-chat-awq',
  'qwen1.5-7b-chat-awq',
  'sqlcoder-7b-2',
  'starling-lm-7b-beta',
  'tinyllama-1.1b-chat-v1.0',
  'una-cybertron-7b-v2-bf16',
  'zephyr-7b-beta-awq',
];
</script>
