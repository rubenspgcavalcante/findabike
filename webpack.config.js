const path = require('path');
const { dev, prod } = require('./webpack/envs');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    app: './app.jsx'
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, 'app'), 'node_modules']
  },
  plugins,
  module: loaders
};