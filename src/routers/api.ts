import apiService from '../services/api'

const useRouterGuard = (handler: Promise<Response>) => {
  return async (request: Request, env: Env, ctx: ExecutionContext) => {
    const { token } = request.query ?? {};
    const { TOKEN } = env;

    console.log('token', token, TOKEN)

    // 没有传token参数
    if (TOKEN && !token) {
      return new Response('400 Bad Request', { status: 400 });
    }

    // token不匹配
    if (TOKEN !== token) {
      return new Response('403 Forbidden', { status: 403 });
    }

    // 正常处理
    return await handler(request, env, ctx)
  }
}

export default {
  use(router) {
    router.post('/api/add', useRouterGuard(apiService.add));

    router.post('/api/delete', useRouterGuard(apiService.delete));

    router.get('/api/get/:key+', useRouterGuard(apiService.get));

    router.get('/api/list', useRouterGuard(apiService.list));
  }
}