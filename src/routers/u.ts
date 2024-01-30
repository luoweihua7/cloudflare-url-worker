import proxy from '../services/proxy';

export default {
  use(router) {
    router.get('/u/:key+', proxy.fetch);
  }
}
