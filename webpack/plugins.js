const { DefinePlugin, optimize: { CommonsChunkPlugin } } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const { version } = require('../package.json');
const { getLastCommitHash } = require("./utils");

const { dev, test, prod, CURRENT } = require('./envs');
const path = dev('/') || prod('/findabike/');

module.exports = [
  new CopyWebpackPlugin([
      { from: 'assets/manifest.json', flatten: false },
      { from: 'assets/robots.txt', flatten: false },
      { from: 'assets/icons', flatten: false }
    ],
  ),
  new HtmlWebpackPlugin({
    title: 'Find a Bike',
    template: 'index.html'
  }),
  new CommonsChunkPlugin({
    name: "vendor",
    minChunks: ({ context }) => context && context.includes("node_modules")
  }),
  new ServiceWorkerWebpackPlugin({
    entry: 'sw.js',
    excludes: ['**/.*', '**.hot-update.js', '**/*.map', '**/*.json'],
    transformOptions: serviceWorkerOptions => {
      serviceWorkerOptions.version = dev(`v${version}-dev`) || `v${version}`;
      return serviceWorkerOptions;
    }
  }),
  new ExtractTextPlugin('[name].[hash].css'),
  new DefinePlugin({
    'APP.release': JSON.stringify(getLastCommitHash()),
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
