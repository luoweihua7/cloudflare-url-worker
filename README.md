# Cloudflare URL Worker

自用的一个自定义快捷连接的地址服务。

解决自己经常因为记不住一串很长的连接地址，最后要到处翻记录的问题。

## API

### 管理API

| API                | Method | Body                                                        | QueryString参数                                           | 说明                                            |
| ------------------ | ------ | ----------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| `/api/add`         | POST   | `{"key":"your/key", "value": "real url"}`                   | `token` 验证参数，在 **wrangler.toml** 文件中配置（下同） | 添加一个短链地址                                |
| `/api/get/:key`    | GET    |                                                             | `token`                                                   | 查看短链信息                                    |
| `/api/delete/:key` | POST   | `{"key":"your_key"}` 其中 key 可以包含多级如 **mac/chrome** | `token`                                                   | 删除短链                                        |
| `/api/list`        | GET    |                                                             | `token`<br>`limit` 限制条数，如 5                         | 查看短链列表                                    |
| `/u/:key`          | GET    |                                                             |                                                           | 打开短链，返回内容为直接代理，并非 302 Redirect |
