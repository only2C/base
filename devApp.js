const express = require('express');
const compression = require('compression');
const opn = require('opn')
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path')
const fs = require('fs')
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const proxy = require('http-proxy-middleware')
const Config =  require('./config')
const port = Config.dev.port || 3011;
const autoOpenBrowser = true
const app = express();
const resolve = file => path.resolve(__dirname,file);

const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  noInfo: true,
  // filename: webpackConfig.output.filename,
  // publicPath: '/',
  quiet: true,
  hot: true,
  stats: { colors: true }
  // headers: { "X-Custom-Header": "yes" },
  // stats: {
    // colors: true
  // }
})
const hotMiddleware = webpackHotMiddleware(compiler,{
  log: (msg) => {console.log(msg);}
})
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
app.use(require('connect-history-api-fallback')())
app.use(compression());
app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static('./dll'));

var uri = Config.dev.host+':'+Config.dev.port //'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser) {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)
