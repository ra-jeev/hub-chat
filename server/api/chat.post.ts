export default defineEventHandler(async (event) => {
  const { messages, params } = await readBody(event);
  if (!messages || messages.length === 0 || !params) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing messages or LLM params',
    });
  }

  const config = {
    max_tokens: params.maxTokens,
    temperature: params.temperature,
    top_p: params.topP,
    top_k: params.topK,
    frequency_penalty: params.frequencyPenalty,
    presence_penalty: params.presencePenalty,
    stream: params.stream,
  };

  const ai = hubAI();

  try {
    const result = await ai.run(params.model, {
      messages: params.systemPrompt
        ? [{ role: 'system', content: params.systemPrompt }, ...messages]
        : messages,
      ...config,
    });

    return params.stream
      ? sendStream(event, result as ReadableStream)
      : (
          result as {
            response: string;
          }
        ).response;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing request',
    });
  }
});
