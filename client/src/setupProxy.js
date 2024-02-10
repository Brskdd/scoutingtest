const { createProxyMiddleware } = require('http-proxy-middleware');
//EVERYTIME YOU MAKE A NEW FETCH REQUEST REMEMBER TO ADD THE THING HERE
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/getenvkeys', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getnenvkeys', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getinput', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/writeinput', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/createnode', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getbank', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getnodetypes', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/setmode', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getmode', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getenvvar', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getnenvvar', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/writenenvvar', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/getnodebank', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getvalue',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getnodeid',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getname',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/gettype',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getposx1',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getposy1',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getposx2',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getposy2',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/getcolor',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};