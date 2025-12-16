# Cloudflare Workers AI LLM Playground with Nuxt 💬

[![Cloudflare Workers AI Chat](https://github.com/user-attachments/assets/f393167e-7d21-4d7b-bacf-101103c1d093)](https://hub-chat.rajeevs.workers.dev)

Demo: [https://hub-chat.rajeevs.workers.dev](https://hub-chat.rajeevs.workers.dev)

## Update (12/15/2025)

The project has been migrated to use `nitro-cloudflare-dev` for local development with Cloudflare Workers AI. Alos updated to use Nuxt & Nuxt UI UI v4 (doesn't use Nuxt UI's new chat components). 

> [!WARNING]
> The project no longer uses `nuxthub` after hubAI deprecation from NuxtHub. For older implementation using NuxtHub, please see the `nuxthub` branch.

## Update (04/23/2025)

The project is now deployable on Cloudflare Workers using NuxtHub. The main branch supports `workers` deployment (along with Nuxt UI v3). To deploy using Cloudflare Pages + Workers, please see the `pages` branch.

## Overview

This project is a chat interface to interact with various text generation models supported by [Cloudflare Workers AI](https://ai.cloudflare.com). It allows users to set different LLM parameters, toggle response streaming, handle streaming/non-streaming responses, parse markdown in responses, and includes a dark mode.

[Read the blog post on how I created this LLM playground](https://rajeev.dev/create-cloudflare-workers-ai-llm-playground-using-nuxthub-and-nuxtui).

## Features

* Auto updating AI models list (uses Cloudflare API)
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
* [Cloudflare Workers AI](https://workers.cloudflare.com/solutions/ai): For accessing various LLM models and generating text responses
* [Cloudflare Workers](https://workers.cloudflare.com): Serverless platform to host the application

## Prerequisites

* [Cloudflare Account](https://cloudflare.com): Required for using Workers AI models and deploying the project on Cloudflare Pages

> You can deploy and manage this application with a free Cloudflare account.

## Setup

1. Clone the repository and install the dependencies with [pnpm](https://pnpm.io/):

```bash
pnpm i
```

2. Start the application in development mode

```bash
pnpm dev
```

Open <http://localhost:3000> in your browser.

## Deployment

### Cloudflare Dashboard Deployment

* Push your code to a GitHub repository.
* Link the repository to Cloudflare Workers.
* Deploy from the Admin console.

### Deploy via Wrangler CLI

```bash
pnpm deploy
```

> [!NOTE]
> You need to be logged in to Cloudflare CLI using `wrangler login` before deploying.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
