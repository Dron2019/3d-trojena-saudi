const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'production',
//   mode: 'development',
  entry: {
    index: './src/assets/s3d/scripts/index-app.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        mangle: true,
        toplevel: true,
        compress: {
          drop_console: true,
        
        },
        output: {
          beautify: false
        },
        dead_code: true,
        unused: true,
        reduce_vars: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "raw-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};


/*

new UglifyJSPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          mangle: true,
          toplevel: true,
          compress: {
          drop_console: true
          },
          output: {
            beautify: false
          },
          ecma: 6,
          dead_code: true,
          unused: true,
          reduce_vars: true
        }
      })
*/

module.exports = config;
