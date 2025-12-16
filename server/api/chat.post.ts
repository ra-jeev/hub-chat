export default defineEventHandler(async (event) => {
  const { model, params } = await readBody(event);
  if (!model || !params) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing chat model or params',
    });
  }

  const config = {
    max_tokens: params.maxTokens,
    temperature: params.temperature,
    top_p: params.topP,
    top_k: params.topK,
    frequency_penalty: params.frequencyPenalty,
    presence_penalty: params.presencePenalty,
    repetition_penalty: params.repetitionPenalty,
    stream: params.stream,
  };

  const { cloudflare } = event.context;
  const ai = cloudflare.env.AI;

  try {
    const result = await ai.run(model, {
      messages: params.systemPrompt
        ? [{ role: 'system', content: params.systemPrompt }, ...params.messages]
        : params.messages,
      ...config,
    });

    if (params.stream) {
      if (!(result instanceof ReadableStream)) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Expected a stream response, but did not receive one.',
        });
      }

      setResponseHeader(event, 'Content-Type', 'text/event-stream');
      return sendStream(event, result);
    }

    return (result as unknown as { response?: string }).response;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing request',
    });
  }
});
