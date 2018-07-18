import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import common from './webpack.common.babel.js';

export default merge(common, {
  mode: 'production',
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
  ],
  externals: [nodeExternals()],
});
