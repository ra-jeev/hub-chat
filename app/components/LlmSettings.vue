<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex items-center justify-between px-4 h-14">
      <div class="flex items-center gap-x-4">
        <h2 class="md:text-lg text-gray-600 dark:text-gray-300">
          LLM Settings
        </h2>
      </div>
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        class="md:hidden"
        @click="$emit('hideDrawer')"
      />
    </div>
    <USeparator />
    <div class="p-4 flex-1 space-y-6 overflow-y-auto">
      <UFormField label="Model">
        <USelectMenu
          v-model="llmParams.model"
          class="w-full"
          size="md"
          :items="models"
        />
      </UFormField>

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

      <UFormField label="System Prompt">
        <UTextarea
          v-model="llmParams.systemPrompt"
          :maxrows="8"
          :autoresize="true"
          class="w-full"
        />
      </UFormField>

      <div class="flex items-center justify-between">
        <span>Stream Response</span>
        <USwitch v-model="llmParams.stream" />
      </div>

      <UAccordion :items="accordionItems">
        <template #content>
          <div
            class="p-4 space-y-6 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
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
          </div>
        </template>
      </UAccordion>

      <UButton
        color="neutral"
        variant="subtle"
        size="sm"
        block
        @click="$emit('reset')"
      >
        Reset settings
      </UButton>
    </div>

    <UButton
      to="https://hub.nuxt.com?utm_source=hub-chat"
      target="_blank"
      variant="link"
      color="neutral"
      rel="noopener"
      class="mx-auto mb-4"
    >
      Hosted on NuxtHub
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { LlmParams } from '~~/types';

const llmParams = defineModel('llmParams', {
  type: Object as () => LlmParams,
  required: true,
});

defineEmits(['hideDrawer', 'reset']);

const accordionItems = [
  {
    label: 'Advanced Settings',
  },
];

const defaultModels = [
  '@cf/openai/gpt-oss-120b',
  '@cf/qwen/qwen1.5-0.5b-chat',
  '@cf/google/gemma-2b-it-lora',
  '@hf/nexusflow/starling-lm-7b-beta',
  '@cf/meta/llama-3-8b-instruct',
  '@cf/meta/llama-3.2-3b-instruct',
  '@hf/thebloke/llamaguard-7b-awq',
  '@hf/thebloke/neural-chat-7b-v3-1-awq',
  '@cf/meta/llama-guard-3-8b',
  '@cf/meta/llama-2-7b-chat-fp16',
  '@cf/mistral/mistral-7b-instruct-v0.1',
  '@cf/mistral/mistral-7b-instruct-v0.2-lora',
  '@cf/tinyllama/tinyllama-1.1b-chat-v1.0',
  '@hf/mistral/mistral-7b-instruct-v0.2',
  '@cf/fblgit/una-cybertron-7b-v2-bf16',
  '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
  '@cf/thebloke/discolm-german-7b-v1-awq',
  '@cf/meta/llama-2-7b-chat-int8',
  '@cf/meta/llama-3.1-8b-instruct-fp8',
  '@hf/thebloke/mistral-7b-instruct-v0.1-awq',
  '@cf/qwen/qwen1.5-7b-chat-awq',
  '@cf/meta/llama-3.2-1b-instruct',
  '@hf/thebloke/llama-2-13b-chat-awq',
  '@hf/thebloke/deepseek-coder-6.7b-base-awq',
  '@cf/meta-llama/llama-2-7b-chat-hf-lora',
  '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  '@cf/ibm-granite/granite-4.0-h-micro',
  '@hf/thebloke/openhermes-2.5-mistral-7b-awq',
  '@hf/thebloke/deepseek-coder-6.7b-instruct-awq',
  '@cf/qwen/qwen2.5-coder-32b-instruct',
  '@cf/deepseek-ai/deepseek-math-7b-instruct',
  '@cf/tiiuae/falcon-7b-instruct',
  '@hf/nousresearch/hermes-2-pro-mistral-7b',
  '@cf/aisingapore/gemma-sea-lion-v4-27b-it',
  '@cf/qwen/qwen3-30b-a3b-fp8',
  '@cf/meta/llama-3.1-8b-instruct-awq',
  '@hf/thebloke/zephyr-7b-beta-awq',
  '@cf/google/gemma-7b-it-lora',
  '@cf/qwen/qwen1.5-1.8b-chat',
  '@cf/mistralai/mistral-small-3.1-24b-instruct',
  '@cf/meta/llama-3-8b-instruct-awq',
  '@cf/meta/llama-3.2-11b-vision-instruct',
  '@cf/defog/sqlcoder-7b-2',
  '@cf/microsoft/phi-2',
  '@cf/openai/gpt-oss-20b',
  '@hf/google/gemma-7b-it',
  '@cf/qwen/qwen1.5-14b-chat-awq',
  '@cf/openchat/openchat-3.5-0106',
  '@cf/meta/llama-4-scout-17b-16e-instruct',
  '@cf/google/gemma-3-12b-it',
  '@cf/qwen/qwq-32b',
];

const { data: serverModels } = await useFetch('/api/models');
const models = computed(() =>
  serverModels.value?.length ? serverModels.value : defaultModels,
);
</script>
