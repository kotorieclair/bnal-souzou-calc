const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract(['css-loader', 'stylus-loader'])
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          },
          {
           loader: 'image-webpack-loader',
           options: {
             bypassOnDebug: true
           }
         }
       ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '文アル装像計算機',
      template: './src/index.html',
      meta: {
        description: '文豪とアルケミスト（文アル）の文豪と装像から攻撃・防御・回避の増減値をシミュレートするツール。文豪個別のステータス入力にも対応、攻撃・防御・回避の最終的な数値も出せます。さらに4人分入力できるので、会派編成にも装像比較にも使えます！',
        twauthor: '@kotorieclair',
        twcard: 'summary_large_image',
        url: 'https://kotorieclair.github.io/bnal-souzou-calc/',
        image: 'https://kotorieclair.github.io/bnal-souzou-calc/img/cover.png'
      }
    }),
    new ExtractTextPlugin('style.css')
  ]
};
