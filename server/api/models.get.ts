export default defineCachedEventHandler(
  async (event) => {
    const { cloudflare } = event.context;
    const ai = cloudflare.env.AI;

    try {
      const result = await ai.models({
        task: 'text generation',
        per_page: 100, // should get all of them, else use pagination
      });

      return result.map((model) => model.name);
    } catch (error) {
      console.error('Error fetching models:', error);
    }

    return [];
  },
  {
    maxAge: 24 * 60 * 60, // 1 day
  },
);
