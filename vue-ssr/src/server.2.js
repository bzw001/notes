
const createApp = require('./app');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(__dirname + '/index.template.html','utf-8')
});


server.get('*', (req, res) => {
  const context = {url: req.url};
  const app = createApp(context);
  renderer.renderToString(app, context ,(err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return ;
    }
    res.end(html)
  })
})

server.listen(8080);