<template>
  <div class="flex flex-col h-full">
    <h2 class="p-4 text-lg md:text-xl font-bold">Chat</h2>
    <UDivider />
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-6">
      <div
        v-for="(message, index) in chatHistory"
        :key="index"
        class="flex items-start gap-x-4"
      >
        <div
          class="w-12 h-12 p-2 rounded-full"
          :class="`${
            message.role === 'user' ? 'bg-primary/20' : 'bg-blue-500/20'
          }`"
        >
          <UIcon
            :name="`${
              message.role === 'user'
                ? 'i-heroicons-user-circle-20-solid'
                : 'i-heroicons-sparkles-solid'
            }`"
            class="w-8 h-8"
            :class="`${
              message.role === 'user' ? 'text-primary-400' : 'text-blue-400'
            }`"
          />
        </div>
        <MDC
          class="max-w-none prose dark:prose-invert"
          :value="message.content"
        />
      </div>
    </div>
    <UDivider />
    <div class="flex items-start p-3.5 relative">
      <UTextarea
        v-model="userMessage"
        placeholder="Type something..."
        class="w-full"
        :ui="{ padding: { xl: 'pr-11' } }"
        :rows="1"
        :maxrows="5"
        :disabled="isLoading"
        autoresize
        size="xl"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.shift.exact.prevent="userMessage += '\n'"
      />

      <UButton
        icon="i-heroicons-paper-airplane"
        class="absolute top-5 right-5"
        :disabled="isLoading"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ chatHistory: { role: string; content: string }[] }>();

const emit = defineEmits<{
  message: [message: string];
}>();

const userMessage = ref('');
const isLoading = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const sendMessage = () => {
  if (!userMessage.value.trim()) return;

  isLoading.value = true;
  const message = userMessage.value;
  userMessage.value = '';

  try {
    emit('message', message);
  } finally {
    isLoading.value = false;
  }
};
</script>
