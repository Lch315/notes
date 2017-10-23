require('dotenv').config({ silent: true });

const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.dev.conf');

const port = process.env.PORT ? Number(process.env.PORT) + 1 : 8089;
const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: false,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  // log: false,
  heartbeat: 2000,
});

app.use(hotMiddleware);
app.use(devMiddleware);

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
