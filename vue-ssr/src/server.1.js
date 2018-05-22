import { Server } from 'tls';

//构建后服务器bundle
const createApp = require('/path/to/built-server-bundle.js');
Server.get('*', (req, res) => {
  const context = {url: req.url};
  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page no found');
        } else {
          res.status(500).end('Internal Server Eroor');
        }
      } else {
        res.end(html);
      }
    })
  })
})