# Cloudflare Workers AI LLM Playground with Nuxt 💬

[![NuxtHub AI Chat](https://github.com/user-attachments/assets/f393167e-7d21-4d7b-bacf-101103c1d093)](https://hub-chat.nuxt.dev)

Demo: https://hub-chat.nuxt.dev

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?repo=ra-jeev/hub-chat)

## Overview

This project is a chat interface to interact with various text generation models supported by [Cloudflare Workers AI](https://ai.cloudflare.com). It allows users to set different LLM parameters, toggle response streaming, handle streaming/non-streaming responses, parse markdown in responses, and includes a dark mode.

[Read the blog post on how I created this LLM playground](https://rajeev.dev/create-cloudflare-workers-ai-llm-playground-using-nuxthub-and-nuxtui).

## Features

* Select the text generation model to interact with
* Set different LLM parameters (temperature, max tokens, system prompt, top_p, top_k, etc.)
* Toggle LLM response streaming on/off
* Handle streaming and non-streaming LLM responses on both server and client sides
* Parse and display markdown in LLM responses
* Auto-scroll chat container as responses are streamed
* Dark mode support

## Technologies Used

* [Nuxt](https://nuxt.com): Vue.js framework for the application foundation
* [Nuxt UI](https://ui.nuxt.com): Module for creating a sleek and responsive interface
* [Nuxt MDC](https://github.com/nuxt-modules/mdc): For parsing and displaying chat messages
* [NuxtHub](https://hub.nuxt.com): Deployment and administration platform for Nuxt, powered by Cloudflare

## Prerequisites

* [Cloudflare Account](https://cloudflare.com): Required for using Workers AI models and deploying the project on Cloudflare Pages
* [NuxtHub Account](https://hub.nuxt.com): For managing NuxtHub apps and using AI in development

> You can deploy and manage this application with a free Cloudflare and free NuxtHub account.

## Setup

1. Clone the repository and install the dependencies with [pnpm](https://pnpm.io/):

```bash
pnpm i
```

2. Link your NuxtHub project to use AI models in development (it will ask you to create one if you don't have any)

```bash
npx nuxthub link
```

3. Start the application in development mode

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Deployment

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?repo=ra-jeev/hub-chat)

### NuxtHub Admin

* Push your code to a GitHub repository.
* Link the repository with NuxtHub.
* Deploy from the Admin console.

[Learn more about Git integration](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci)
  
### Deploy via NuxtHub CLI:

```bash
npx nuxthub deploy
```

[Learn more about CLI deployment](https://hub.nuxt.com/docs/getting-started/deploy#nuxthub-cli)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
