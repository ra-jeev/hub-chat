<template>
  <UFormGroup :label="label" :ui="{ container: 'mt-2' }">
    <template #hint>
      <UInput
        v-model="model"
        class="w-[72px]"
        type="number"
        :min="min"
        :max="max"
        :step="step"
      />
    </template>
    <URange v-model="model" :min="min" :max="max" :step="step" size="sm" />
  </UFormGroup>
</template>

<script setup lang="ts">
const model = defineModel({ type: Number, required: true });
defineProps({
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  step: {
    type: Number,
  },
});
</script>
