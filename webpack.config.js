require('@babel/register');

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const pageInfo =  require('./src/pageinfo');

module.exports = env => {
  const node_env = env.NODE_ENV;
  const mode = node_env === 'test' || node_env === 'productionRedirect' ? 'production' : node_env;
   return {
    mode: mode,
    devtool: node_env === 'development' ? 'inline-source-map' : node_env === 'test' ? 'inline-cheap-module-source-map' : undefined,
    entry: node_env === 'productionRedirect' ? './src/main_redirect' : './src/main',
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: mode === 'production',
              },
            },
            'css-loader',
            'stylus-loader',
          ]
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
        template: node_env === 'productionRedirect' ? './src/index_redirect.html' : './src/index.html',
        title: pageInfo.title,
        meta: pageInfo.meta,
        links: pageInfo.links,
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    devServer: {
      contentBase: './dist',
      port: 3001,
      host: '0.0.0.0',
    },
    externals: node_env === 'test' ? [nodeExternals()] : undefined,
  };
};
