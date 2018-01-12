const { ProvidePlugin, DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const { dev, test, prod, CURRENT } = require('./envs');
const path = dev('/') || prod('/findabike/');

module.exports = [
  new CopyWebpackPlugin([{ from: 'index.html' }]),
  new ServiceWorkerWebpackPlugin({ entry: 'sw.js' }),
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery',
    React: 'react'
  }),
  new ExtractTextPlugin('styles.css'),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(CURRENT)
    },
    app: {
      path: JSON.stringify(path)
    }
  }),
  prod(new OptimizeCssAssetsPlugin()),
  prod(new UglifyJSPlugin({
    sourceMap: true
  }))
].filter(plugin => plugin !== null);
