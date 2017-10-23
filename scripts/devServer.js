require('dotenv').config({ silent: true });

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const parseRange = require('range-parser');
const mime = require('mime');


const webpackConfig = require('./webpack/webpack.dev.conf');

const port = process.env.PORT ? Number(process.env.PORT) + 1 : 8089;
const app = express();
const compiler = webpack(webpackConfig);

// webpack-dev-middleware block
const handleRangeHeaders = (content, req, res) => {
  //assumes express API. For other servers, need to add logic to access alternative header APIs
  res.setHeader("Accept-Ranges", "bytes");
  if(req.headers.range) {
    var ranges = parseRange(content.length, req.headers.range);

    // unsatisfiable
    if(-1 == ranges) {
      res.setHeader("Content-Range", "bytes */" + content.length);
      res.statusCode = 416;
    }

    // valid (syntactically invalid/multiple ranges are treated as a regular response)
    if(-2 != ranges && ranges.length === 1) {
      // Content-Range
      res.statusCode = 206;
      var length = content.length;
      res.setHeader(
        "Content-Range",
        "bytes " + ranges[0].start + "-" + ranges[0].end + "/" + length
      );

      content = content.slice(ranges[0].start, ranges[0].end + 1);
    }
  }
  return content;
}

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

app.get('*', (req, res, next) => {
  const indexPath =  path.resolve(webpackConfig.output.path, 'index.html');
  let content = compiler.outputFileSystem.readFileSync(indexPath);

  content = handleRangeHeaders(content, req, res);

  res.setHeader("Content-Type", mime.lookup(indexPath) + "; charset=UTF-8");
  res.setHeader("Content-Length", content.length);

  // Express automatically sets the statusCode to 200, but not all servers do (Koa).
  res.statusCode = res.statusCode || 200;
  res.send(content);
});

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
