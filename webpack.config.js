require('@babel/register');

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const pageInfo =  require('./src/pageinfo');

module.exports = env => {
  const node_env = env.NODE_ENV;
  const mode = node_env === 'test' ? 'production' : node_env;

  return {
    mode: mode,
    devtool: node_env === 'development' ? 'inline-source-map' : node_env === 'test' ? 'inline-cheap-module-source-map' : undefined,
    entry: './src/main',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js', '.vue', '.styl'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.styl$/,
          use: node_env === 'production' ? ExtractTextPlugin.extract(['css-loader', 'stylus-loader']) : ['vue-style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img/',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(node_env),
      }),  
      new CleanWebpackPlugin(['dist']),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: pageInfo.title,
        meta: pageInfo.meta,
        links: pageInfo.links,
      }),
      new ExtractTextPlugin('style.css'),
    ],
    devServer: {
      contentBase: './dist',
      port: 3000,
      host: '0.0.0.0',
    },
    externals: node_env === 'test' ? [nodeExternals()] : undefined,
  };
};
