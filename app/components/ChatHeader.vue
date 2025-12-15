<template>
  <div class="flex items-center justify-between px-4 h-14">
    <div class="flex items-center gap-x-4">
      <h2 class="text-xl md:text-2xl text-primary font-bold">Hub Chat</h2>
      <UTooltip v-if="!clearDisabled" text="Clear chat">
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide-trash-2"
          @click="$emit('clear')"
        />
      </UTooltip>
    </div>
    <div class="flex items-center gap-x-4">
      <UColorModeButton />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/ra-jeev/hub-chat"
        target="_blank"
      />
      <UButton
        icon="i-lucide-settings"
        color="neutral"
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
