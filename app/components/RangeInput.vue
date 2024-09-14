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
    <URange :key="`${label}-${rangeKey}`" v-model="model" :min="min" :max="max" :step="step" size="sm" />
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

const rangeKey = ref(0);
onMounted(() => {
  rangeKey.value++;
});
</script>
