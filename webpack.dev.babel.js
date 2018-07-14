import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel.js';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    host: '0.0.0.0',
  },
});
