module.exports = require('./make-webpack-config')({
  devtool: 'source-map',
  entry: {
    app: './app/index.js',
  },
});
