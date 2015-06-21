module.exports = require('./make-webpack-config')({
  devtool: 'eval',
  entry: {
    app: './app/index.js',
  },
});
