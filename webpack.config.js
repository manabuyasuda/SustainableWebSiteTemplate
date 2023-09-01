const webpack = require('webpack');
const { resolve } = require('path');

const environment = process.env.NODE_ENV || 'development';
const isProduction = environment === 'production';
const environmentConfig = require(`./config/${environment}.js`); // eslint-disable-line

module.exports = {
  mode: environment,
  entry: {
    site: resolve(__dirname, 'src/assets/js/site.js'),
  },
  output: {
    path: resolve(__dirname, 'htdocs/assets/js'),
    filename: `[name].js`,
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src/assets/js/'),
      '@lib': resolve(__dirname, 'src/assets/js/lib'),
      '@utility': resolve(__dirname, 'src/assets/js/utility'),
      '@namespace': resolve(__dirname, 'src/assets/js/namespace'),
    },
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environmentConfig),
    }),
  ],
};
