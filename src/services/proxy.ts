import KVConfig from "./kv-config";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = new KVConfig(env.UrlKV);
    const { key } = request.params;
    const url = await kv.get(key); // 获取对应的 URL

    if (url) {
      return await fetch(url, request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
