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

  const ai = hubAI();

  try {
    const result = await ai.run(model, {
      messages: params.systemPrompt
        ? [{ role: 'system', content: params.systemPrompt }, ...params.messages]
        : params.messages,
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
