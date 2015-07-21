module.exports = require('./make-webpack-config')({
  devtool: 'eval-source-map',
  entry: {
    app: './app/index.js',
  },
});
