const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = path.resolve(__dirname, './../../');

const config = {
  context: rootPath,
  entry: {
    index: ['webpack-hot-middleware/client', './client/index.js'],
  },
  output: {
    path: rootPath + '/assets',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: ['node_modules'],
        loader: 'babel-loader',
        query: {
          presets: [
            ['react', {}],
            ['es2015', {}],
            ['stage-0', {}],
            ['react-hmre', {}],
          ],
          plugins: [
            'add-module-exports',
            'transform-runtime',
          ],
        },
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
          'postcss-loader',
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
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
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
      template: './client/index.html',
      chunks: ['vendors', 'index'],
      inject: true,
    }),
  ],
};

module.exports = config;
