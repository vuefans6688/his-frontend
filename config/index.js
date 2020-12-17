/*
 * @Author: your name
 * @Date: 2019-11-11 11:13:45
 * @LastEditTime: 2019-11-14 15:03:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backendc:\Users\Administrator\Desktop\澳考\aokao-cloud-frontend\config\index.js
 */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }, 
  dev: {
    env: require('./dev.env'),
    port: 9904,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/service': {
        target: 'http://his.aokaoyun.com/',
        // target: 'http://192.168.0.223:20115/',
        changeOrigin: true,
        // pathRewrite:{
        //   '^/service':''
        // }
      },
    },
    cssSourceMap: false
  },
}
