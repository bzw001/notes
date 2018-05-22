import { Server } from "https";
import { INSPECT_MAX_BYTES } from "buffer";

const microCache = LRU({
  max: 100,
  maxAge: 1000 //条目在1s后过期
})

cosnt isCacheable = req => {
  //检查请求是否为用户特定，对于非用户特定的页面才会缓存

}
//对于每一个缓存的页面，服务器最多会只能每秒执行一次完成渲染
Server.get('*', (req, res) => {
  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      return res.end(hit);
    }
  }
  renderer.renderToString((err, html) => {
    res.end(html);
    if (cacheable) {
      microCache.set(req.url, html);
    }
  })
})