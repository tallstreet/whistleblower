module.exports = require('./make-webpack-config')({
  devtool: 'source-map',
  entry: {
    app: ['webpack-dev-server/client?http://0.0.0.0:8080', 'webpack/hot/only-dev-server', './app/index.js'],
  },
});
