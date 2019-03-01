const path = require('path');
const webpack = require('webpack');
const requestHost= process.env.NODE_ENV == 'development' ? JSON.stringify('dev') : JSON.stringify('prod');
module.exports = {
  output: {
    // publicPath: 'http://cdn.com/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    // 该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      requestHost
    })
  ]
};
