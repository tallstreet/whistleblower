module.exports = require('./make-webpack-config')({
  production: true,
  entry: {
    app: './app/client.js',
    vendor: [
      "rx",
      "react",
      "react/addons",
      "lodash",
      "classnames",
      "keymirror",
      "whatwg-fetch",
      "es6-promise",
    ],
  },
});
