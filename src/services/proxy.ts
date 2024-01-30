import KVConfig from "./kv-config";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = new KVConfig(env.UrlKV);
    const uri = new URL(request.url);
    const { key } = request.params;
    const url = await kv.get(key); // 获取对应的 URL

    console.log(`${uri.pathname} key="${key}", url="${url}"`)

    if (url !== null) {
      return await fetch(url, request);
    }

    // return new Response('404 Not Found', { status: 404 });
  },
};
