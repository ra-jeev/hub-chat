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

      <RangeInput
        v-model="llmParams.topP"
        label="Top P"
        :min="0"
        :max="2"
        :step="0.1"
      />

      <RangeInput v-model="llmParams.topK" label="Top K" :min="1" :max="50" />

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

defineEmits(['toggleDrawer']);
</script>
