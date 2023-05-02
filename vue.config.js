const path = require('path');
process.env.VUE_APP_NAME = require('./package.json').name;
process.env.VUE_APP_VERSION = require('./package.json').version;
process.env.VUE_APP_REPOSITORY = require('./package.json').repository.url;
const configCanknowIconWebpack = require('canknow-icon/build/configWebpack.js');

function resolve(dir) {
  return path.join(__dirname, 'examples', dir);
}

module.exports = {
  publicPath: '/canknow-ui/',
  transpileDependencies: [
    /canknow-ui-core/,
    /canknow-core/,
    /canknow-icon/
  ],
  configureWebpack: (config) => {
    config.externals = {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    };
    config.module.rules.push({
      test: /\.md$/,
      use: [{
        loader: 'vue-loader'
      }, {
        loader: path.resolve(__dirname, './md-loader/index.js')
      }]
    });
  },
  chainWebpack (config) {
    config.resolve.alias.set('@', resolve('/src'));

    configCanknowIconWebpack(config, resolve);
  }
};

