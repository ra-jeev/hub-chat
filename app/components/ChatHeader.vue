<template>
  <div class="flex items-center justify-between p-4">
    <div class="flex items-center gap-x-4">
      <h2 class="text-xl md:text-2xl text-primary font-bold">Hub Chat</h2>
      <UTooltip text="Clear chat">
        <UButton
          color="gray"
          icon="i-heroicons-trash"
          size="xs"
          :disabled="clearDisabled"
          @click="$emit('clear')"
        />
      </UTooltip>
    </div>
    <div class="flex items-center gap-x-4">
      <ColorMode />
      <UButton
        icon="i-heroicons-cog-6-tooth"
        color="gray"
        variant="ghost"
        class="md:hidden"
        @click="$emit('showDrawer')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['clear', 'showDrawer']);

defineProps({
  clearDisabled: {
    type: Boolean,
    default: true,
  },
});
</script>
