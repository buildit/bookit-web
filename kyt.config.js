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
