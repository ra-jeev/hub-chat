# Cloudflare Workers AI LLM Playground with NuxtHub and NuxtUI

## Overview

This project is a chat interface to interact with various text generation models supported by Cloudflare Workers AI. It allows users to set different LLM parameters, toggle response streaming, handle streaming/non-streaming responses, parse markdown in responses, and includes a dark mode.

## Features

* Set different LLM parameters (temperature, max tokens, system prompt, top_p, top_k, etc.)
* Toggle LLM response streaming on/off
* Handle streaming and non-streaming LLM responses on both server and client sides
* Parse and display markdown in LLM responses
* Auto-scroll chat container as responses are streamed
* Dark mode support

## Technologies Used

* Nuxt 3: Vue.js framework for the application foundation
* Nuxt UI: Module for creating a sleek and responsive interface
* NuxtHub: Deployment and administration platform for Nuxt, powered by Cloudflare
* Nuxt MDC: For parsing and displaying chat messages

## Prerequisites

* Cloudflare Account: Required for using Workers AI models and deploying the project on Cloudflare Pages
* NuxtHub Admin Account: For managing NuxtHub apps

## Setup Instructions

1. Create a new NuxtHub project:

```bash
npx nuxthub init my-project
```

2. Add Nuxt UI module:

```bash
npx nuxi module add ui
```

3. Add Nuxt MDC module:

```bash
npx nuxi module add mdc
```

4. Run the project:

```bash
pnpm dev
```

## Deployment

### Deploy via NuxtHub Admin Console:

* Push your code to a GitHub repository.
* Link the repository with NuxtHub.
* Deploy from the Admin console.
  
### Deploy via NuxtHub CLI:

```bash
npx nuxthub deploy
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.