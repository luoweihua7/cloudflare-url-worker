import config from '../config';

const prefix = config.KEY_PREFIX;

export default class KVConfig {
  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async get(key: string): Promise<string | null> {
    return await this.kv.get(`${prefix}${key}`);
  }

  async set(key: string, value: string): Promise<void> {
    await await this.kv.put(`${prefix}${key}`, value);
  }

  async delete(key: string): Promise<void> {
    await await this.kv.delete(`${prefix}${key}`);
  }

  /**
   * 列出所有符合条件的键
   * @param limit [number] 限制返回的键的数量
   */
  async list(limit?: number): Promise<string[]> {
    const keys = [];
    let cursor = '';
    let fullfilled = false;
    let completed = false;

    if (limit === 0) return keys; // 如果传入了0， 则直接返回空数组

    // 查询所有符合条件的键
    do {
      const { keys: k, list_complete, cursor: c } = await this.kv.list({
        prefix,
        cursor,
      });
      keys.push(...k);

      if (limit !== undefined && keys.length >= limit) {
        fullfilled = true;
        keys.splice(limit);
      }

      cursor = c;
      completed = list_complete;
    } while (!completed && !fullfilled);

    return keys;
  }
}