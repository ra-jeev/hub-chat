export default defineEventHandler(async (event) => {
  const { messages, params } = await readBody(event);
  if (!messages || messages.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing messages',
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
});
