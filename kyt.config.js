const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  reactHotLoader: true,
  debug: false,
  hasServer: false,
  modifyWebpackConfig: (config, options) => {
    if (options.type === 'client') {
      config.plugins.push(new HtmlWebpackPlugin({
        template: 'src/index.ejs',
      }));
    }
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias.actions = path.join(__dirname, 'src/actions');
    config.resolve.alias.api = path.join(__dirname, 'src/api');
    config.resolve.alias.assets = path.join(__dirname, 'src/assets');
    config.resolve.alias.client = path.join(__dirname, 'src/client');
    config.resolve.alias.components = path.join(__dirname, 'src/components');
    config.resolve.alias.containers = path.join(__dirname, 'src/containers');
    config.resolve.alias.lib = path.join(__dirname, 'src/lib');
    config.resolve.alias.utils = path.join(__dirname, 'src/utils');
    config.resolve.alias.routes = path.join(__dirname, 'src/routes');
    config.resolve.alias.sagas = path.join(__dirname, 'src/sagas');
    config.resolve.alias['shared-styles'] = path.join(__dirname, 'src/shared-styles');

    return config;
  },
  modifyJestConfig: (baseConfig) => {
    const jestConfig = Object.assign({}, baseConfig);
    const setupFiles = jestConfig.setupFiles || [];

    setupFiles.push(path.join(__dirname, 'jest.mocks.js'));

    jestConfig.globals = { window: {} };
    jestConfig.setupFiles = setupFiles;

    return jestConfig;
  },
};
