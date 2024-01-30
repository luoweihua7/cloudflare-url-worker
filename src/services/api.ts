import KVConfig from "./kv-config"

const getKV = (env: Env) => {
  return new KVConfig(env.UrlKV)
}

export default {
  async add(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { key, value } = await request.json();
    console.log('/api/add', key, value)
    const ret = await kv.set(key, value)

    return new Response(`Add ${key}=${ret}`)
  },
  async get(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { key } = await request.params ?? {};
    console.log('/api/get', key)
    const ret = await kv.get(key)

    return new Response(`Get ${key}=${ret}`)
  },
  async delete(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { key } = request.params ?? {}
    console.log('/api/delete', key)
    const ret = await kv.delete(key)

    return new Response(`Delete ${key}=${ret}`)
  },
  async list(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { prefix, limit } = await request.query;
    console.log('/api/list', prefix, limit)
    const keys = await kv.list(prefix, limit);

    return new Response(`List ${JSON.stringify(keys)}`)
  }
}