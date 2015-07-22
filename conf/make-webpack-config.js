var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var RewirePlugin = require("rewire-webpack");

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function(options) {
  options.lint = fs.existsSync(path.join(__dirname, '..', '.eslintrc')) && options.lint !== false;

  var cssLoaders = 'style!css!cssnext!autoprefixer?browsers=last 2 versions';
  var scssLoaders = cssLoaders + '!sass';
  var sassLoaders = scssLoaders + '?indentedSyntax=sass';

  if (options.production) {
    cssLoaders = extractForProduction(cssLoaders);
    sassLoaders = extractForProduction(sassLoaders);
    scssLoaders = extractForProduction(scssLoaders);
  }
  scssLoaders += '?outputStyle=expanded&includePaths[]=' + path.resolve(__dirname, '../node_modules/bootstrap-sass/assets/stylesheets') +
    '&includePaths[]=' + path.resolve(__dirname, '../node_modules') +
    '&includePaths[]=' + path.resolve(__dirname, '../app/styles')
    ;

  var jsLoaders = ['babel'];

  return {
    entry: options.entry,
    debug: !options.production,
    devtool: options.devtool,
    output: {
      path: options.production ? './dist' : './build',
      publicPath: options.production ? '' : 'http://0.0.0.0:8080/',
      filename: options.production ? '[name].[hash].js' : '[name].js',
      chunkFilename: options.production ? '[name]-[chunkhash].js' : '[name]-[chunkhash].js'
    },
    cssnext: {
      browsers: 'last 2 versions'
    },
    module: {
      noParse: [
          /sinon.js/,
      ],
      preLoaders: options.lint ? [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint',
        },
      ] : [],
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: options.production ? jsLoaders : ['react-hot'].concat(jsLoaders),
        },
        {
          test: /\.css$/,
          loader: cssLoaders,
        },
        {
          test: /\.sass$/,
          loader: sassLoaders,
        },
        {
          test: /\.scss$/,
          loader: scssLoaders,
        },
        {
          test: /\.json$/,
          loader: "json",
        },
        {
          test: /\.png$/,
          loader: "url?limit=100000&mimetype=image/png",
        },
        {
          test: /\.svg$/,
          loader: "url?limit=100000&mimetype=image/svg+xml",
        },
        {
          test: /\.gif$/,
          loader: "url?limit=100000&mimetype=image/gif",
        },
        {
          test: /\.jpg$/,
          loader: "file",
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    plugins: options.production ? [
      // Important to keep React file size down
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          // Mainly used to require CSS files with webpack, which can happen only on browser
          // Used as `if (process.env.BROWSER)...`
          'BROWSER': JSON.stringify(true)
        }
      }),
      new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __DEVELOPMENT__: false, __DEVTOOLS__: false}),
      // ignore dev config
      new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
      function stats() {
        this.plugin('done', function writeStats(stats) {
          fs.writeFileSync('./manifest.json', JSON.stringify(stats.toJson().assetsByChunkName));
        });
      },
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "[name].[hash].js",
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin("app.[hash].css"),
      new HtmlWebpackPlugin({
        template: './conf/tmpl.html',
        production: true,
      })
    ] : [
      new HtmlWebpackPlugin({
        template: './conf/tmpl.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
      }),
      new RewirePlugin()
    ]
  };
};
