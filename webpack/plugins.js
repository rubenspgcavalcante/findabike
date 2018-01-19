const { ProvidePlugin, DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const { version } = require('../package.json');

const { dev, test, prod, CURRENT } = require('./envs');
const path = dev('/') || prod('/findabike/');


module.exports = [
  new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'manifest.json' },
      { from: 'assets/icons', flatten: false}
    ],
  ),
  new ServiceWorkerWebpackPlugin({
    entry: 'sw.js',
    excludes: ['**/.*', '**/*.map', '**/*.json'],
    transformOptions: serviceWorkerOptions => {
      serviceWorkerOptions.version = dev(`v${version}-dev`) || `v${version}`;
      return serviceWorkerOptions;
    }
  }),
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
