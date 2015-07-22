var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('./webpack.config'),
  host = process.env.HOST || '0.0.0.0',
  port = parseInt(process.env.PORT) + 1 || 8080,
  serverOptions = {
    contentBase: 'http://' + host + ':' + port,
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: {colors: true}
  },
  compiler = webpack(config),
  webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(port, host, function() {
  console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
});
