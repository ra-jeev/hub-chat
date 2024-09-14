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
    <URange
      :key="`${label}-${rangeKey}`"
      v-model="model"
      :min="min"
      :max="max"
      :step="step"
      size="sm"
    />
  </UFormGroup>
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

// This is needed to force a re-render of the range component (using a key)
// (to update the slider thumb), when value is read from localStorage
const rangeKey = ref(0);
onMounted(() => {
  rangeKey.value++;
});
</script>
