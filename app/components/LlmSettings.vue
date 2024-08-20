<template>
  <div class="h-full flex flex-col overflow-hidden">
    <h2 class="p-4 text-lg md:text-xl font-bold">LLM Settings</h2>
    <UDivider />
    <div class="p-4 flex-1 space-y-6 overflow-y-auto">
      <RangeInput
        label="Temperature"
        :min="0"
        :max="5"
        :step="0.1"
        v-model="llmParams.temperature"
      />

      <RangeInput
        label="Max Tokens"
        :min="1"
        :max="4096"
        v-model="llmParams.maxTokens"
      />

      <RangeInput
        label="Top P"
        :min="0"
        :max="2"
        :step="0.1"
        v-model="llmParams.topP"
      />

      <RangeInput label="Top K" :min="1" :max="50" v-model="llmParams.topK" />

      <RangeInput
        label="Frequency Penalty"
        :min="0"
        :max="2"
        :step="0.1"
        v-model="llmParams.frequencyPenalty"
      />

      <RangeInput
        label="Presence Penalty"
        :min="0"
        :max="2"
        :step="0.1"
        v-model="llmParams.presencePenalty"
      />

      <RangeInput
        label="Repetition Penalty"
        :min="0"
        :max="2"
        :step="0.1"
        v-model="llmParams.repetitionPenalty"
      />

      <UFormGroup label="System Prompt">
        <UTextarea
          v-model="llmParams.systemPrompt"
          :rows="3"
          :maxrows="8"
          autoresize
        />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
type LlmParams = {
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
</script>
