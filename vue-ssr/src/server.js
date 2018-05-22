const server = require('express')();
const template = require('fs').readFileSync('/path/to/template.html', 'utf-8')
const clientManifest = require('/path/to/vue-ssr-client-manifest.json')
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer('/path/to/vue-ssr-server-bundle.json', {
  runInNewContext: false, 
  template //可选 页面模板
  clientManifest //可选 客户端构建manifest
})

server.get('*', (req, res) => {
  const context = {url: req.url};
  //无需传入一个应用程序，因为在执行bundle的时候已经自动创建过
  //服务器与应用程序已经解耦
  renderer.renderToString(context, (err, html) => {
    //处理异常
    res.end(html);
  })
})
server.listen(8080);