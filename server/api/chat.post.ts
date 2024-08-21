const resStr = `Below are some ordered comments:
1. Enable ai in nuxt.config.ts under hub config.
2. Call hubAI() in your server side code to access AI Workers.
3. Call the run method to get the response.

You can use either of the following ways to get a response.
- pass a prompt
- pass a list of messages along with a system prompt

Return some code snippet:

\`\`\`ts
const a = 1;
\`\`\``;

export default defineEventHandler(async (event) => {
  const { message, params } = await readBody(event);
  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing message',
    });
  }

  console.log('params', params);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { message: resStr };
});
