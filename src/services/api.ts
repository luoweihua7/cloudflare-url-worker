import KVConfig from "./kv-config"

const getKV = (env: Env) => {
  return new KVConfig(env.UrlKV)
}

const createJSONResponse = (data: any) => {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

const KEY_PREFIX = 'SHORT_URL_KEY:'

export default {
  async add(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { key, value } = await request.json();
    console.log('/api/add', key, value)
    const ret = await kv.set(`${KEY_PREFIX}${key}`, value)

    return createJSONResponse({ code: 0, data: { key, ret } })
  },
  async get(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { key } = await request.params ?? {};
    console.log('/api/get', key)
    const ret = await kv.get(`${KEY_PREFIX}${key}`)

    return createJSONResponse({ code: 0, data: { key, ret } })
  },
  async delete(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { key } = request.params ?? {}
    console.log('/api/delete', key)
    const ret = await kv.delete(`${KEY_PREFIX}${key}`)

    return createJSONResponse({ code: 0, data: { key, ret } })
  },
  async list(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = getKV(env);
    const { prefix, limit } = await request.query;
    console.log('/api/list', prefix || KEY_PREFIX, limit)
    const keys = await kv.list(prefix || KEY_PREFIX, limit);

    return createJSONResponse({ code: 0, data: keys })
  }
}