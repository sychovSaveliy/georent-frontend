/**
 * COMMON WEBPACK CONFIGURATION
 */
const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const constants = {
  PUBLIC_PATH: 'static'
};

const dirs = {
  src: resolve('app'),
  styles: resolve('app/styles'),
  dist: resolve(`dist/${constants.PUBLIC_PATH}`),
  dev: resolve('dev'),
  node_modules: resolve('node_modules')
};

const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]-[hash:base64:7]',
    sourceMap: true
  }
};

/**
 * CSS/SASS loaders configuration which is compatible with MiniCssExtractPlugin
 * extraction plugin
 *
 * @type {*[]}
 */
const cssExtractRules = [
  {
    test: /\.s?css$/,
    exclude: [dirs.node_modules, dirs.styles],
    use: [
      MiniCssExtractPlugin.loader,
      cssLoaderConfig,
      'resolve-url-loader',
      'sass-loader?sourceMap',
    ],
  },
  {
    test: /\.s?css$/,
    include: [dirs.node_modules, dirs.styles],
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'resolve-url-loader',
      'sass-loader?sourceMap',
    ],
  }
];


/**
 * Webpack rules
 *
 * @type {[]}
 */
const rules = [
  {
    test: /\.jsx?$/,
    exclude: dirs.node_modules,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.(jpe?g|png|gif)$/,
    loader: 'url-loader',
    options: {
      limit: 1024,
      name: 'images/[name].[hash:8].[ext]',
    },
  }, {
    test: /\.svg$/,
    loader: 'url-loader',
    options: {
      limit: 1024,
      name: 'images/[name].[hash:8].[ext]',
    },
  }, {
    test: /\.(eot)(\?[a-z0-9=&.]+)?$/,
    loader: 'url-loader',
    options: {
      limit: 1024,
      name: 'fonts/[name].[hash:8].[ext]',
    },
  }, {
    test: /\.(ttf|otf)(\?[a-z0-9=&.]+)?$/,
    loader: 'url-loader',
    options: {
      limit: 1024,
      mimetype: 'application/octet-stream',
      name: 'fonts/[name].[hash:8].[ext]',
    },
  }, {
    test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
    loader: 'url-loader',
    options: {
      limit: 1024,
      mimetype: 'application/font-woff',
      name: 'fonts/[name].[hash:8].[ext]',
    },
  }
];

process.noDeprecation = true;

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/'
    },
    options.output
  ), // Merge with env dependent settings
  module: {
    rules: [
      ...cssExtractRules,
      ...rules
    ]
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main']
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  optimization: {
    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2
    }
  }
});
