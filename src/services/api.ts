import KVConfig from "./kv-config"

class ApiService {
  static getKV(env: Env) {
    return new KVConfig(env.UrlKV);
  }

  static responseJSON(data: any) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  }

  async add(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = ApiService.getKV(env);
    const uri = new URL(request.url);
    const { key, value } = await request.json();

    if (key.startsWith('/')) {
      return ApiService.responseJSON({ code: -400, msg: `key should not start with "/"` })
    }

    console.log(`/api/add key="${key}", value="${value}"`)
    const ret = await kv.set(key, value)
    const url = `${uri.protocol}//${uri.hostname}/u/${key}`

    return ApiService.responseJSON({ code: 0, data: { key, url } })
  }

  async get(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = ApiService.getKV(env);
    const { key } = await request.params ?? {};
    console.log(`/api/get key="${key}"`)
    const value = await kv.get(key)

    return ApiService.responseJSON({ code: value === null ? -404 : 0, data: { key, value } })
  }

  async delete(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = ApiService.getKV(env);
    const { key } = request.params ?? {}
    console.log(`/api/delete key="${key}"`)
    const ret = await kv.delete(key)

    return ApiService.responseJSON({ code: 0, data: { key, ret } })
  }

  async list(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const kv = ApiService.getKV(env);
    const { limit } = await request.query;
    console.log(`/api/list limit="${limit}"`)
    const keys = await kv.list(limit);

    return ApiService.responseJSON({ code: 0, data: keys })
  }
}

export default new ApiService()