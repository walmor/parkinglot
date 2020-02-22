const config = require('./core/config');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${config.API_PORT}`,
      changeOrigin: true,
    }),
  );
};
