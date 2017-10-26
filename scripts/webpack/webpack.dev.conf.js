const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require('marked');
const highlight = require('highlight.js');

const rootPath = path.resolve(__dirname, './../../');

const config = {
  context: rootPath,
  entry: {
    index: ['webpack-hot-middleware/client', './client/index.js'],
  },
  output: {
    path: path.resolve(rootPath, 'assets'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                'react',
                'es2015',
                'stage-0',
                'react-hmre',
              ],
              plugins: [
                'add-module-exports',
                'transform-runtime',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: 'markdown-loader',
            options: {
              renderer: markedRenderer(),
              highlight: function (code) {
                return highlight.highlightAuto(code).value;
              },
            }
          }
        ],
      },
    ],
  },
  resolve: {
    modules: [
     'client',
     'node_modules',
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.html',
      chunks: ['vendors', 'index'],
    }),
  ],
};

module.exports = config;

// 设置marked
function markedRenderer() {
  const Renderer = marked.Renderer;
  const codeParse = Renderer.prototype.code;

  Renderer.prototype.code = function() {
    return '<div class="code">' + codeParse.apply(this, Array.prototype.slice.call(arguments)).replace(/<pre>/, '<pre class="hljs">') + '</div>';
  }

  return new Renderer;
}
