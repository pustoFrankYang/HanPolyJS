const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/db',
    createProxyMiddleware({
      target: 'https://pustofrankyang.github.ion',
      changeOrigin: true,
    })
  );
};