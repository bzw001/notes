const Vue  = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html','utf-8')
});

//作为renderToString函数的第二个参数
const context = {
  title: 'HELLO',
  meta:`
    <meta>
  `
}
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url :req.url
    },
    template: '<div>访问的url： {{url}}</div>'
  });
  renderer.renderToString(app, context ,(err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return ;
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Hello</title>
        </head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080);