<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Hub Chat',
  ogTitle: 'Hub Chat - Cloudflare AI LLM Playground',
  description:
    'Hub Chat is a Cloudflare Workers AI LLM playground with NuxtHub and Nuxt UI.',
  ogImage:
    'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2h1Yi1jaGF0Lm51eHQuZGV2IiwiaWF0IjoxNzI0NTcyMzI3fQ.HqgnQrHVs34qdjFSP6RYy_M94duSAgPEvGgHF5j0xvI.jpg?theme=light',
  twitterCard: 'summary_large_image',
});
</script>
