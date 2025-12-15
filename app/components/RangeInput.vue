<template>
  <UFormField :label="label" :ui="{ container: 'mt-2' }">
    <template #hint>
      <UInput
        v-model="model"
        class="w-18"
        type="number"
        :min="min"
        :max="max"
        :step="step"
      />
    </template>
    <USlider
      :key="`${label}-${rangeKey}`"
      v-model="model"
      :min="min"
      :max="max"
      :step="step"
      size="sm"
    />
  </UFormField>
</template>

<script setup lang="ts">
const model = defineModel({ type: Number, default: undefined });

defineProps({
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    default: undefined,
  },
  max: {
    type: Number,
    default: undefined,
  },
  step: {
    type: Number,
    default: undefined,
  },
});

// Needed to force a re-render of the range component when the value is
// read from localStorage (updates the key to force a re-render)
const rangeKey = ref(0);
onMounted(() => {
  rangeKey.value++;
});
</script>
